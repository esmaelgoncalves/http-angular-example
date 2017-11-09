import { LivroService } from './livro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  livros = [];

  constructor(private livroService: LivroService) { }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.livroService.consultar()
      .then(livros => {
        this.livros = livros;
      })
      .catch(erro =>{
        alert(erro);
      });
  }

  adicionar(nome: string) {
    this.livroService.adicionar({ nome })
      .then(livro => {
        alert(`Livro ${livro.nome} adicionado com sucesso!`);
        this.consultar();
      })
      .catch(erro =>{
        alert(erro);
      });
  }

  excluir(id: number) {
    this.livroService.excluir(id)
      .then(() => {
        alert('Livro exluído com sucesso!');
        this.consultar();
      })
      .catch(erro =>{
        alert(erro);
      });
      
  }

  atualizar(livro: any) {
    this.livroService.atualizar(livro)
      .then(livro => {
        alert(`Livro ${livro.nome} atualizado com sucesso!`);
        this.consultar();
      })
      .catch(erro =>{
        alert(erro);
      });
  }

}
