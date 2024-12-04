import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
  User,
  Session,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';
import { AlmacenamientoService } from '../pages/almacenamiento.service';

interface SignUpCredentials {
  email: string;
  password: string;
  metadata: {
    name: string;
    is_student: boolean;
  };
}
interface SignUpResponse {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: Error | null;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private dataService: DataService,
    private almacenamiento: AlmacenamientoService
  ) {
    this.supabase = createClient(
      environment.supabaseURL,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.currentUser.next(session?.user || null);
      } else {
        this.currentUser.next(null);
      }
    });

    this.loadUser();
  }

  async signUp(credentials: SignUpCredentials): Promise<SignUpResponse> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.metadata?.name,
            is_student: credentials.metadata?.is_student || false,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw error;
      if ((await this.almacenamiento.exists('username')) != null) {
        await this.almacenamiento.remove('username');
      }

      if (credentials.metadata?.is_student) {
        const { data: student, error: studenterror } =
          await this.dataService.insertStudent(
            data.user.id,
            credentials.metadata.name,
            credentials.email
          );

        if (studenterror) throw error;
        await this.almacenamiento.set('username', student);
      } else {
        const { data: professor, error: professorerror } =
          await this.dataService.insertProfessor(
            data.user.id,
            credentials.metadata.name,
            credentials.email
          );
        if (professorerror) throw error;
        await this.almacenamiento.set('username', professor);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in signUp:', error);
      return {
        data: null,
        error:
          error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }

  // ... rest of your service methods ...

  async loadUser() {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    this.currentUser.next(user);
  }

  async signIn(credentials: { email: string; password: string }) {
    const { data, error } = await this.supabase.auth.signInWithPassword(
      credentials
    );
    if (error) throw error;
    if (data.user) {
      if (await this.almacenamiento.exists('username')) {
        await this.almacenamiento.remove('username');
      }
      if (data.user.user_metadata['is_student']) {
        const { data: perfil, error: errorperfil } =
          await this.dataService.selectStudent(data.user.id);
        if (errorperfil) throw errorperfil;
        if (perfil) await this.almacenamiento.set('username', perfil);
      } else {
        const { data: perfil, error: errorperfil } =
          await this.dataService.selectProfessor(data.user.id);
        if (errorperfil) throw errorperfil;
        if (perfil) await this.almacenamiento.set('username', perfil);
      }
    }
    return { data, error };
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }
}
