import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { getTitleById, type DisneyTitle } from "../catalog.js";

function formatPrivateFiche(t: DisneyTitle): string {
  return (
    `🎬 <b>${t.titreFr}</b> (${t.titreOriginal}, ${t.annee})\n\n` +
    `<b>Synopsis :</b>\n${t.synopsisFr}\n\n` +
    `<b>Casting :</b> ${t.casting.join(", ")}\n` +
    `<b>Durée :</b> ${t.duree}\n` +
    `<b>Genre :</b> ${t.genre.join(", ")}\n` +
    `<b>Âge recommandé :</b> ${t.ageRecommande}\n` +
    `<b>Langues :</b> ${t.langues.join(", ")}\n\n` +
    `<i>Envoyé en privé depuis DisneyFanBot 🏰</i>`
  );
}

const composer = new Composer<Ctx>();

composer.callbackQuery(/^receive:title:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const titleId = ctx.match![1];
  const title = getTitleById(titleId);
  if (!title) {
    await ctx.editMessageText("Titre introuvable.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    });
    return;
  }

  await ctx.reply(formatPrivateFiche(title), {
    parse_mode: "HTML",
  });

  await ctx.editMessageText(
    "📥 Fiche envoyée en privé ! Vérifie tes messages privés avec le bot.",
    {
      reply_markup: inlineKeyboard([
        [inlineButton("⬅️ Retour à la fiche", `fiche:${titleId}`)],
      ]),
    },
  );
});

composer.callbackQuery("receive:private", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    "📥 Sélectionne d'abord un titre via 🔍 Rechercher ou 🔥 Top titres, puis appuie sur « Recevoir en privé ».",
    { reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]) },
  );
});

export default composer;
