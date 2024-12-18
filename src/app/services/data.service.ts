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
    return this.supabase
      .from('asistance')
      .select('*,Class(*)')
      .eq('idstudent', idUsuario);
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
  crearCurso(name: string, code: string, idProfesor: string) {
    return this.supabase
      .from('Subject')
      .insert({
        name: name,
        code: code,
        idProfessor: idProfesor,
      })
      .select('*')
      .single();
  }
  //Crear clase
  crearClase(schedule: Date, idAsignatura: string) {
    return this.supabase
      .from('Class')
      .insert({
        schedule: schedule,
        idSubject: idAsignatura,
      })
      .select('*')
      .single();
  }
  //Registrar asistencia
  registrarAsistencia(idStudent: string, idClass: string) {
    return this.supabase
      .from('asistance')
      .update({
        status: true,
      })
      .eq(idClass, idClass)
      .eq(idStudent, idStudent)
      .select('*')
      .single();
  }

  getCursos(idStudent: string) {
    {
      return this.supabase
        .from('lista')
        .select('*, Subject(*)')
        .eq('idStudent', idStudent);
    }
  }
  insertStudent(idStudent: string, name: string, email: string) {
    return this.supabase
      .from('student')
      .insert({
        id: idStudent,
        name: name,
        email: email,
      })
      .select('*')
      .single();
  }
  insertProfessor(idProfessor: string, name: string, email: string) {
    return this.supabase
      .from('professor')
      .insert({
        idProfessor: idProfessor,
        name: name,
        email: email,
      })
      .select('*')
      .single();
  }
  selectStudent(idStudent: string) {
    return this.supabase
      .from('student')
      .select('*')
      .eq('id', idStudent)
      .single();
  }
  selectProfessor(idProfesor: string) {
    return this.supabase
      .from('professor')
      .select('*')
      .eq('idProfessor', idProfesor)
      .single();
  }
  //OTRO METODO DE AGARRAR LOS CURSOS NO SE PORQUE
  selectCursos(idProfesor: string) {
    return this.supabase
      .from('Subject')
      .select('*')
      .eq('idProfessor', idProfesor);
  }
  //Muestra la lista dependiendo del que el estudiante haya ido a clases
  mostrarLista(idSubject: string) {
    return this.supabase
      .from('asistance')
      .select('*,Class(*,Subject(*)),student(*)')
      .match({ 'Class.idSubject': idSubject })
      .filter('Class', 'not.is', null);
  }
  //Registro de alumno a nuevo curso
  registrarCurso(idEstudiante: string, idRamo: string) {
    return this.supabase
      .from('lista')
      .insert({ idStudent: idEstudiante, idSubject: idRamo })
      .single();
  }
  //Devuelve los inscritos en una asignatura
  mostrarInscritos(idRamo: string) {
    return this.supabase.from('lista').select('*').eq('idSubject', idRamo);
  }
  //Devuelve la lista de un profesor
  seleccionarRamo(idAsignatura: string) {
    return this.supabase
      .from('lista')
      .select('*,student(*)')
      .eq('idSubject', idAsignatura);
  }
  //Recuperar a todos los estudiantes que no esten inscritos en una asignatura
  async alumnosnoAsignaturas(idRamo: string) {
    const inscritos = (
      await this.supabase
        .from('lista')
        .select('idStudent')
        .eq('idSubject', idRamo)
    ).data;
    const ids = inscritos?.map((student: any) => student.idStudent) || [];
    console.log(ids);
    return this.supabase
      .from('student')
      .select('*, lista(*)')
      .not('id', 'in', `(${ids.join(',')})`);
  }
}
