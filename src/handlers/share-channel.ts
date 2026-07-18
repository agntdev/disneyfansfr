import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { getTitleById } from "../catalog.js";

const composer = new Composer<Ctx>();

composer.callbackQuery(/^share:title:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const titleId = ctx.match![1];
  const title = getTitleById(titleId);
  if (!title) {
    await ctx.editMessageText("Titre introuvable.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    });
    return;
  }

  const shareText =
    `🎬 <b>${title.titreFr}</b> (${title.titreOriginal}, ${title.annee})\n\n` +
    `${title.synopsisFr}\n\n` +
    `${title.genre.join(" · ")} • ${title.duree} • ${title.ageRecommande}`;

  await ctx.editMessageText(
    "📤 Voici le message à partager dans le channel :\n\n" + shareText,
    {
      reply_markup: inlineKeyboard([
        [inlineButton("⬅️ Retour à la fiche", `fiche:${titleId}`)],
      ]),
      parse_mode: "HTML",
    },
  );
});

composer.callbackQuery("share:channel", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    "📤 Sélectionne d'abord un titre via 🔍 Rechercher ou 🔥 Top titres, puis appuie sur « Partager dans le channel ».",
    { reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]) },
  );
});

export default composer;
