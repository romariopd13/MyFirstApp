import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: Produto[] = [];
  productsSubscription: Subscription;
  loading: any;
  constructor(
    private productsService: ProdutoService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
    // this.carregarDados()
  }

  carregarDados() {
    this.productsSubscription = this.productsService.listarTodosProdutos().subscribe(res => {
      console.log(res);

      this.products = res;
    })
  }
  async deleteProduct(id: number) {
    await this.presentLoading();
    try {
      await this.productsService.deletarProduto(id)
      await this.loading.dismiss();
      await this.presentToast("Produto excluído com sucesso!")

    } catch (error) {
      this.presentToast(error.message)
      this.loading.dismiss();
    }
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  ionViewWillEnter() {
    this.carregarDados()
  }
}
