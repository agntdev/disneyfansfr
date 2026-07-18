import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";

const HELP =
  "ℹ️ Comment ça marche ?\n\n" +
  "Tout se fait en appuyant sur les boutons — pas besoin de retenir des commandes !\n\n" +
  "• 🔍 Rechercher — Trouve un film ou une série Disney\n" +
  "• ⭐ Recommander — Des suggestions selon tes goûts\n" +
  "• 🔥 Top titres — Les plus populaires du moment\n" +
  "• 🔔 Alertes — Abonne-toi aux nouveautés\n\n" +
  "Appuie sur /start pour revenir au menu.";

const backToMenu = inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]);

const composer = new Composer<Ctx>();

composer.command("help", async (ctx) => {
  await ctx.reply(HELP);
});

composer.callbackQuery("menu:help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(HELP, { reply_markup: backToMenu });
});

export default composer;
