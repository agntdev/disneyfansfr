import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { getTitleById, searchCatalog, type DisneyTitle } from "../catalog.js";

function formatFiche(t: DisneyTitle): string {
  return (
    `🎬 <b>${t.titreFr}</b>\n` +
    `<i>${t.titreOriginal}</i> (${t.annee})\n\n` +
    `<b>Synopsis :</b>\n${t.synopsisFr}\n\n` +
    `<b>Casting :</b> ${t.casting.join(", ")}\n` +
    `<b>Durée :</b> ${t.duree}\n` +
    `<b>Genre :</b> ${t.genre.join(", ")}\n` +
    `<b>Âge recommandé :</b> ${t.ageRecommande}\n` +
    `<b>Langues :</b> ${t.langues.join(", ")}`
  );
}

function buildFicheKeyboard(t: DisneyTitle): ReturnType<typeof inlineKeyboard> {
  return inlineKeyboard([
    [inlineButton("📤 Partager dans le channel", `share:title:${t.id}`)],
    [inlineButton("📥 Recevoir en privé", `receive:title:${t.id}`)],
    [inlineButton("🔔 S'abonner aux mises à jour", `subscribe:title:${t.id}`)],
    [inlineButton("⬅️ Retour au menu", "menu:main")],
  ]);
}

const composer = new Composer<Ctx>();

composer.callbackQuery(/^fiche:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const titleId = ctx.match![1];
  const title = getTitleById(titleId);
  if (!title) {
    await ctx.editMessageText("Titre introuvable. Réessaie.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    });
    return;
  }
  ctx.session.pendingTitleId = titleId;
  await ctx.editMessageText(formatFiche(title), {
    reply_markup: buildFicheKeyboard(title),
    parse_mode: "HTML",
  });
});

composer.command("fiche", async (ctx) => {
  const query = (ctx.message?.text ?? "").replace(/^\/fiche\s*/i, "").trim();
  if (!query) {
    await ctx.reply(
      "🔍 Tape le nom du titre dont tu veux la fiche complète :",
      { reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]) },
    );
    ctx.session.step = "awaiting_fiche_query";
    return;
  }
  const results = searchCatalog(query);
  if (results.length === 0) {
    await ctx.reply("Aucun titre trouvé. Vérifie l'orthographe et réessaie.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    });
    return;
  }
  const title = results[0];
  ctx.session.pendingTitleId = title.id;
  await ctx.reply(formatFiche(title), {
    reply_markup: buildFicheKeyboard(title),
    parse_mode: "HTML",
  });
});

composer.on("message:text", async (ctx, next) => {
  if (ctx.session.step !== "awaiting_fiche_query") return next();
  const query = ctx.message.text.trim();
  ctx.session.step = undefined;
  const results = searchCatalog(query);
  if (results.length === 0) {
    await ctx.reply("Aucun titre trouvé. Vérifie l'orthographe et réessaie.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    });
    return;
  }
  const title = results[0];
  ctx.session.pendingTitleId = title.id;
  await ctx.reply(formatFiche(title), {
    reply_markup: buildFicheKeyboard(title),
    parse_mode: "HTML",
  });
});

export default composer;
