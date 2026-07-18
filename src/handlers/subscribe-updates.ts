import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { getTitleById } from "../catalog.js";

const composer = new Composer<Ctx>();

composer.callbackQuery(/^subscribe:title:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const titleId = ctx.match![1];
  const title = getTitleById(titleId);
  if (!title) {
    await ctx.editMessageText("Titre introuvable.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    });
    return;
  }

  await ctx.editMessageText(
    `🔔 Abonnement confirmé pour <b>${title.titreFr}</b> !\n\n` +
      "Tu recevras une notification quand il y aura du nouveau sur ce titre.",
    {
      reply_markup: inlineKeyboard([
        [inlineButton("⬅️ Retour à la fiche", `fiche:${titleId}`)],
      ]),
      parse_mode: "HTML",
    },
  );
});

composer.callbackQuery("subscribe:updates", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    "🔔 Sélectionne d'abord un titre via 🔍 Rechercher ou 🔥 Top titres, puis appuie sur « S'abonner aux mises à jour ».",
    { reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]) },
  );
});

export default composer;
