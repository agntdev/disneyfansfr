import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import {
  mainMenuKeyboard,
  registerMainMenuItem,
  inlineButton,
  inlineKeyboard,
} from "../toolkit/index.js";

registerMainMenuItem({ label: "🔍 Rechercher", data: "recherche:menu", order: 10 });
registerMainMenuItem({ label: "⭐ Recommander", data: "recommande:menu", order: 20 });
registerMainMenuItem({ label: "🔥 Top titres", data: "top:show", order: 30 });
registerMainMenuItem({ label: "🔔 Alertes", data: "alerte:menu", order: 40 });

const WELCOME =
  "Bienvenue sur DisneyFanBot ! 🏰\n\n" +
  "Explore le monde Disney : films, séries, recommandations personnalisées et alertes.\n\n" +
  "Choisis une option ci-dessous 👇";

const composer = new Composer<Ctx>();

composer.command("start", async (ctx) => {
  await ctx.reply(WELCOME, { reply_markup: mainMenuKeyboard() });
});

composer.callbackQuery("menu:main", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(WELCOME, { reply_markup: mainMenuKeyboard() });
});

export default composer;
