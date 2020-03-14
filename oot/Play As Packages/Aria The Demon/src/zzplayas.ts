import { IPlugin, IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { bus } from 'modloader64_api/EventHandler';
import { OotOnlineEvents} from './OotoAPI/OotoAPI';
import path from 'path';
import { IOOTCore } from 'modloader64_api/OOT/OOTAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import fse from 'fs-extra';

class zzdata {
  adult_model!: string[];
  child_model!: string[];
  anim_file!: string;
  adult_icon!: string;
  child_icon!: string;
  config_file!: string;
}

interface zzplayas_malon_options{
  adult_costume: number;
  child_costume: number;
}

class zzplayas implements IPlugin {
  ModLoader!: IModLoaderAPI;
  pluginName?: string | undefined;
  @InjectCore()
  core!: IOOTCore;

  preinit(): void {
    let zz: zzdata = (this as any)['metadata']['zzplayas'];
    if (!fse.existsSync(zz.config_file)){
      fse.writeFileSync(zz.config_file, JSON.stringify({adult_costume: 0, child_costume: 0} as zzplayas_malon_options, null, 2));
    }
    let config: zzplayas_malon_options = fse.readJSONSync(zz.config_file);
    if (zz.adult_model.length > 0) {
      if (zz.adult_model[config.adult_costume] !== undefined){
        bus.emit(
          OotOnlineEvents.CUSTOM_MODEL_APPLIED_ADULT,
          path.resolve(path.join(__dirname, zz.adult_model[config.adult_costume]))
        );
      }
    }
    if (zz.child_model.length > 0) {
      if (zz.child_model[config.child_costume] !== undefined){
        bus.emit(
          OotOnlineEvents.CUSTOM_MODEL_APPLIED_CHILD,
          path.resolve(path.join(__dirname, zz.child_model[config.child_costume]))
        );
      }
    }
    if (zz.anim_file !== '') {
      bus.emit(OotOnlineEvents.CUSTOM_MODEL_APPLIED_ANIMATIONS, path.resolve(path.join(__dirname, zz.anim_file)));
    }
    if (zz.adult_icon !== ''){
      bus.emit(OotOnlineEvents.CUSTOM_MODEL_APPLIED_ICON_ADULT, path.resolve(path.join(__dirname, zz.adult_icon)));
    }
    if (zz.child_icon !== ''){
      bus.emit(OotOnlineEvents.CUSTOM_MODEL_APPLIED_ICON_CHILD, path.resolve(path.join(__dirname, zz.child_icon)));
    }
  }
  init(): void {}
  postinit(): void {}
  onTick(): void {}
}

module.exports = zzplayas;
