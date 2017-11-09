import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LivroService {

  constructor(private http: Http) { }

  consultar(): Promise<any> {
    return this.http.get('http://localhost:3000/livros')
      .toPromise()
      .then(response => response.json())
      .catch(erro => {
        return Promise.reject('Erro ao consultar livros');
      });
  }

  adicionar(livro: any): Promise<any> {
    return this.http.post('http://localhost:3000/livros', livro)
      .toPromise()
      .then(response => response.json())
      .catch(erro => {
        return Promise.reject(`Erro ao adicionar livro ${livro}`);
      });
  }

  atualizar(livro: any): Promise<any> {
    return this.http.put(`http://localhost:3000/livros/${livro.id}`, livro)
      .toPromise()
      .then(response => response.json())
      .catch(erro => {
        return Promise.reject(`Erro ao alterar livro ${livro.id}`);
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`http://localhost:3000/livros/${codigo}`)
      .toPromise()
      .then(() => null)
      .catch(erro => {
        return Promise.reject(`Erro ao excluir livro ${codigo}`);
      });
  }

}
