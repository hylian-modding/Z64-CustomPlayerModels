# Custom OoT Online Skin Guide

### What you'll need:
 - [Experience](http://www.z64.me/guides/blender-play-as) (yes, you must first be familiar with this page)
 - [skin.zobj](./skin.zobj) (literally a blank file because `zzplayas` needs something to overwrite)
 - [One of our official manifests, for the rom and character you are replacing](../manifests)

### Creating the play-as ZOBJ
Download the `manifest file` that corresponds to the rom and character you are replacing and load it into `zzplayas`. You can find them in the `manifests` directory of this repository.

Now select the `...` next to `Target`. This will prompt you to select a rom. __Do not select a rom.__ Instead, select `.zobj` from the `File Type` selection menu. Now we are able to navigate to `skin.zobj`. Select it and click `Open`.

Finally, click the `Import` button. You will either get a message saying that the ZOBJ was written successfully, or an error. So long as you are following the `Blender` and `Converting` parts of [the tutorial](http://www.z64.me/guides/blender-play-as) properly and are using our provided `manifest(s)`, you should not get any errors.

### Using the play-as ZOBJ inside OoT Online
You can test the zobj using the [zobj testing tool](https://cdn.discordapp.com/attachments/706278515447824384/821455357728653432/OotOPlayasDev.pak). When you're ready to submit, use the [template zip file](https://github.com/hylian-modding/zzplayas_modloader_template/releases).

### Submitting a play-as ZOBJ to our database
Use the [play-as submission form](https://forms.gle/J7L6TQFNR53hKQzGA).
