import { LivroService } from './livro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  livros = [];
  hasErro: boolean = false;
  isSucesso: boolean = false;
  mensagem: string;

  constructor(private livroService: LivroService) { }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.livroService.consultar()
      .then(livros => {
        this.livros = livros;
      })
      .catch(erro => {
        this.hasErro = true;
        this.mensagem = erro;
      });
  }

  adicionar(nome: string) {

    if (nome.length == 0) {
      this.hasErro = true;
      this.mensagem = 'O nome não pode ser vazio.';
      return;
    }

    this.livroService.adicionar({ nome })
      .then(livro => {
        this.mensagem = `Livro ${livro.nome} adicionado com sucesso!`;
        this.isSucesso = true;
        this.consultar();
      })
      .catch(erro => {
        this.hasErro = true;
        this.mensagem = erro;
      });
  }

  excluir(id: number) {
    this.livroService.excluir(id)
      .then(() => {
        this.mensagem = 'Livro exluído com sucesso!';
        this.isSucesso = true;
        this.consultar();
      })
      .catch(erro => {
        this.hasErro = true;
        this.mensagem = erro;
      });

  }

  atualizar(livro: any) {
    this.livroService.atualizar(livro)
      .then(livro => {
        this.mensagem = `Livro ${livro.nome} atualizado com sucesso!`;
        this.isSucesso = true;
        this.consultar();
      })
      .catch(erro => {
        this.hasErro = true;
        this.mensagem = erro;
      });
  }

  limparMensagens(){
    this.hasErro = false;
    this.isSucesso = false;
    this.mensagem = '';
  }

}
