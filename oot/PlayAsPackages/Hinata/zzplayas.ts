import { IPlugin, IModLoaderAPI, ModLoaderEvents } from 'modloader64_api/IModLoaderAPI';
import { bus, EventHandler } from 'modloader64_api/EventHandler';
import { OotOnlineEvents } from './OotoAPI/OotoAPI';
import path from 'path';
import { IOOTCore } from 'modloader64_api/OOT/OOTAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { Z64RomTools, DMATable, DMATableEntry } from './Z64Lib/API/Z64RomTools';


class zzdata {
  adult_model!: string;
  child_model!: string;
  anim_file!: string;
  adult_icon!: string;
  child_icon!: string;
}

class zzplayas implements IPlugin {
  ModLoader!: IModLoaderAPI;
  pluginName?: string | undefined;
  @InjectCore()
  core!: IOOTCore;

  preinit(): void { }
  init(): void {
    let zz: zzdata = (this as any)['metadata']['zzplayas'];
    if (zz.adult_model !== '') {
      bus.emit(
        OotOnlineEvents.CUSTOM_MODEL_APPLIED_ADULT,
        path.resolve(path.join(__dirname, zz.adult_model))
      );
    }
    if (zz.child_model !== '') {
      bus.emit(
        OotOnlineEvents.CUSTOM_MODEL_APPLIED_CHILD,
        path.resolve(path.join(__dirname, zz.child_model))
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
  postinit(): void {
    
   }

  @EventHandler(ModLoaderEvents.ON_ROM_PATCHED)
  onRomPatched(evt: any) {
    let tools: Z64RomTools = new Z64RomTools(this.ModLoader, 0x7430);
    let sword_swipe: Buffer = tools.decompressFileFromRom(evt.rom, 34);

    this.ModLoader.logger.info("Changing Hinata's Sword Swipe...");
    let addr: number = 0x094CB8FF;
    sword_swipe.writeUInt32BE(addr, 0x2240C);
    sword_swipe.writeUInt32BE(addr + 4, 0x2240C);

    tools.recompressFileIntoRom(evt.rom, 34, sword_swipe);
  }

  onTick(): void { }
}

module.exports = zzplayas;
