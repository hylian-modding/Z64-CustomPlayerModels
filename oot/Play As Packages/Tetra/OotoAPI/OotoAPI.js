"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("modloader64_api/EventHandler");
var OotOnlineEvents;
(function (OotOnlineEvents) {
    OotOnlineEvents["PLAYER_PUPPET_PRESPAWN"] = "OotOnline:onPlayerPuppetPreSpawned";
    OotOnlineEvents["PLAYER_PUPPET_SPAWNED"] = "OotOnline:onPlayerPuppetSpawned";
    OotOnlineEvents["PLAYER_PUPPET_DESPAWNED"] = "OotOnline:onPlayerPuppetDespawned";
    OotOnlineEvents["SERVER_PLAYER_CHANGED_SCENES"] = "OotOnline:onServerPlayerChangedScenes";
    OotOnlineEvents["CLIENT_REMOTE_PLAYER_CHANGED_SCENES"] = "OotOnline:onRemotePlayerChangedScenes";
    OotOnlineEvents["GHOST_MODE"] = "OotOnline:EnableGhostMode";
    OotOnlineEvents["GAINED_HEART_CONTAINER"] = "OotOnline:GainedHeartContainer";
    OotOnlineEvents["GAINED_PIECE_OF_HEART"] = "OotOnline:GainedPieceOfHeart";
    OotOnlineEvents["MAGIC_METER_INCREASED"] = "OotOnline:GainedMagicMeter";
    OotOnlineEvents["CUSTOM_MODEL_APPLIED_ADULT"] = "OotOnline:ApplyCustomModelAdult";
    OotOnlineEvents["CUSTOM_MODEL_APPLIED_CHILD"] = "OotOnline:ApplyCustomModelChild";
    OotOnlineEvents["CUSTOM_MODEL_APPLIED_ANIMATIONS"] = "OotOnline:ApplyCustomAnims";
    OotOnlineEvents["CUSTOM_MODEL_APPLIED_ICON_ADULT"] = "OotOnline:ApplyCustomIconAdult";
    OotOnlineEvents["CUSTOM_MODEL_APPLIED_ICON_CHILD"] = "OotOnline:ApplyCustomIconChild";
    OotOnlineEvents["ON_INVENTORY_UPDATE"] = "OotOnline:OnInventoryUpdate";
})(OotOnlineEvents = exports.OotOnlineEvents || (exports.OotOnlineEvents = {}));
class OotOnline_PlayerScene {
    constructor(player, lobby, scene) {
        this.player = player;
        this.scene = scene;
        this.lobby = lobby;
    }
}
exports.OotOnline_PlayerScene = OotOnline_PlayerScene;
function OotOnlineAPI_EnableGhostMode() {
    EventHandler_1.bus.emit(OotOnlineEvents.GHOST_MODE, {});
}
exports.OotOnlineAPI_EnableGhostMode = OotOnlineAPI_EnableGhostMode;
//# sourceMappingURL=OotoAPI.js.map