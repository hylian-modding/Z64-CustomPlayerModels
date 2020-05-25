import { IPlugin, IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { bus } from 'modloader64_api/EventHandler';
import { OotOnlineEvents } from './OotoAPI/OotoAPI';
import path from 'path';
import { IOOTCore } from 'modloader64_api/OOT/OOTAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import fse from 'fs-extra';

class zzdata {
  adult_model!: string;
  child_model!: string;
  anim_file!: string;
  adult_icon!: string;
  child_icon!: string;
  config_file!: string;
}

interface zzplayas_mm_young_link_options {
  replace_equipment: number;
}

class zzplayas implements IPlugin {
  ModLoader!: IModLoaderAPI;
  pluginName?: string | undefined;
  @InjectCore()
  core!: IOOTCore;

  preinit(): void { }
  init(): void {
    let zz: zzdata = (this as any)['metadata']['zzplayas'];
	if (!fse.existsSync(zz.config_file)){
      fse.writeFileSync(zz.config_file, JSON.stringify({replace_equipment: 0} as zzplayas_mm_young_link_options, null, 1));
    }
	let config: zzplayas_mm_young_link_options = fse.readJSONSync(zz.config_file);
	
    if (zz.adult_model !== '') {
      bus.emit(
        OotOnlineEvents.CUSTOM_MODEL_APPLIED_ADULT,
        path.resolve(path.join(__dirname, zz.adult_model))
      );
    }
    if (zz.child_model !== '') {
	  let choice: string = zz.child_model;
	  if(config.replace_equipment > 0) {
		choice = 'no_equip_' + choice;
	  }
      bus.emit(
      OotOnlineEvents.CUSTOM_MODEL_APPLIED_CHILD,
      path.resolve(path.join(__dirname, choice))
        );
      }
    
    if (zz.anim_file !== '') {
      bus.emit(OotOnlineEvents.CUSTOM_MODEL_APPLIED_ANIMATIONS, path.resolve(path.join(__dirname, zz.anim_file)));
    }
    if (zz.adult_icon !== '') {
      bus.emit(OotOnlineEvents.CUSTOM_MODEL_APPLIED_ICON_ADULT, path.resolve(path.join(__dirname, zz.adult_icon)));
    }
    if (zz.child_icon !== '') {
      bus.emit(OotOnlineEvents.CUSTOM_MODEL_APPLIED_ICON_CHILD, path.resolve(path.join(__dirname, zz.child_icon)));
    }
  }
  postinit(): void { }
  onTick(): void { }
}

module.exports = zzplayas;
