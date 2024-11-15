import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { environment } from 'src/environments/environment';
import { Database } from 'src/supabase';
const GROUPS_DB = 'groups';
const MESSAGE_DB = 'messages';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient<Database>(
      environment.supabaseURL,
      environment.supabaseKey
    );
  }
  //Digame que esta funcion no la hice yo po
  registrarAsistencia(
    schedule: Date,
    idAsignatura: number,
    idAsistencia: number
  ) {
    return this.supabase
      .from('Class')
      .insert({
        schedule: schedule,
        idAsignatura: idAsignatura,
        idAsistencia: idAsistencia,
      })
      .select('*')
      .single();
  }
  //O ESTO PARECE UN COMENTARIO DE CHAT GPT
  verAsistencia(idUsuario: string) {
    return this.supabase.from('Class').select('*').eq('idUsuario', 'idStudent');
  }

  //O UN COMENTARIO QUE HARIA OTRA PERSONA
  verCursos(idUsuario: string) {
    return this.supabase
      .from('subject')
      .select('*')
      .eq('idUsuario', 'idStudent');
  }

}
