import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
  async get(key: string){
    if (!this._storage) await this.init()
      return await this._storage?.get(key)
  }
  async remove(key: string){
    if (!this._storage) await this.init()
      return await this._storage?.remove(key)
  }
  async exists(key: string) {
    if (!this._storage) await this.init();
    const keys = await this._storage?.keys();
    return keys?.includes(key);
  }

}

