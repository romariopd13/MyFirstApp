import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_api } from 'src/environments/environment';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  listarTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${url_api}/produto`)
  }
  buscaProdutoPorId(id): Observable<Produto> {
    return this.http.get<Produto>(`${url_api}/produto/${id}`)
  }
  salvarNovoProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${url_api}/produto`, produto)
  }
  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${url_api}/produto/${produto.id}`, produto)
  }
  deletarProduto(id: number): Observable<any> {
    return this.http.delete<any>(`${url_api}/produto/${id}`)
  }
}
