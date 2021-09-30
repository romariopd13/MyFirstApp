import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  product: Produto = {}
  productId: string = null
  loading: any;
  productsSubscription: Subscription;
  constructor(
    private productsService: ProdutoService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.productId = this.activatedRoute.snapshot.params['id'];
    if (this.productId) this.loadProduct();
  }

  ngOnInit() {
  }
  enviarDados() {
    return this.productId ? this.atualizaProduto() : this.salvaProduto()
  }
  async salvaProduto() {
    await this.presentLoading();
    this.productsSubscription = this.productsService.salvarNovoProduto(this.product).subscribe(res => {
      console.log(res)
      this.loading.dismiss();
      this.presentToast("Salvo com Sucesso!!!")
      this.navCtrl.navigateRoot('/home')
    }, error => {
      console.log(error);
      this.loading.dismiss();
      this.presentToast("Ops, deu erro. Tente novamente mais tarde.")

    })
  }
  async atualizaProduto() {
    await this.presentLoading();
    this.productsSubscription = this.productsService.atualizarProduto(this.product).subscribe(res => {
      console.log(res)
      this.loading.dismiss();
      this.presentToast("Salvo com Sucesso!!!")
      this.navCtrl.navigateRoot('/home')
    }, error => {
      console.log(error);
      this.loading.dismiss();
      this.presentToast("Ops, deu erro. Tente novamente mais tarde.")

    })
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
  loadProduct() {
    this.productsSubscription = this.productsService.buscaProdutoPorId(this.productId).subscribe(res => {
      this.product = res
    })
  }
  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
