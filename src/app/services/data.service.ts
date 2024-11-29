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
  //O ESTO PARECE UN COMENTARIO DE CHAT GPT
  verAsistencia(idUsuario: string) {
    return this.supabase.from('Class').select('*').eq('idUsuario', 'idStudent');
  }

  //O UN COMENTARIO QUE HARIA OTRA PERSONA
  //Ver cursos de estudiante
  verCursos(idUsuario: string) {
    return this.supabase.from('subject').select('*').eq('idStudent', idUsuario);
  }
  //Ver cursos de profesor
  mostrarAsignaturas(idProfesor: string) {
    return this.supabase
      .from('subject')
      .select('*')
      .eq('idProfessor', idProfesor);
  }
  //Insertar curso
  crearCurso(name: string, code: string) {
    return this.supabase
      .from('Subject')
      .insert({
        name: name,
        code: code,
      })
      .select('*')
      .single();
  }
  //Crear clase 
  crearClase(schedule : Date, idAsignatura : string){
    return this.supabase.from('Class').insert({
      schedule : schedule,
      idSubject : idAsignatura
    }). select('*').single();
  }
  //Registrar asistencia 
  registrarAsistencia(idStudent: string ,idClass: string){
    return this.supabase.from('Asistance').insert({
      status : true,
      idClass : idClass,
      idStudent : idStudent
    }).select('*').single();
  }
  

}
