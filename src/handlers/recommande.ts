import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard, registerMainMenuItem } from "../toolkit/index.js";
import { getRecommendations, getCatalogByGenre, type DisneyTitle } from "../catalog.js";

registerMainMenuItem({ label: "⭐ Recommander", data: "recommande:menu", order: 20 });

function formatRecommendations(titles: DisneyTitle[]): string {
  if (titles.length === 0) {
    return "Aucune recommandation ne correspond. Essaie avec d'autres critères.";
  }
  const lines = titles.map(
    (t, i) =>
      `${i + 1}. <b>${t.titreFr}</b> (${t.annee}) — ${t.genre.join(", ")}\n` +
      `   <i>${t.synopsisFr.substring(0, 100)}…</i>`,
  );
  return `⭐ Voici tes recommandations :\n\n${lines.join("\n\n")}`;
}

function buildRecommendationKeyboard(): ReturnType<typeof inlineKeyboard> {
  return inlineKeyboard([
    [inlineButton("🔄 Autres suggestions", "recommande:other")],
    [inlineButton("⬅️ Retour au menu", "menu:main")],
  ]);
}

const composer = new Composer<Ctx>();

composer.callbackQuery("recommande:menu", async (ctx) => {
  await ctx.answerCallbackQuery();
  const genres = getCatalogByGenre();
  const genreRows = genres.map((g) => [inlineButton(g, `recommande:genre:${g}`)]);
  genreRows.push([inlineButton("🎲 Surprise !", "recommande:surprise")]);
  genreRows.push([inlineButton("⬅️ Retour au menu", "menu:main")]);
  await ctx.editMessageText(
    "⭐ Quel genre te plaît ?",
    { reply_markup: inlineKeyboard(genreRows) },
  );
});

composer.callbackQuery(/^recommande:genre:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const genre = ctx.match![1];
  ctx.session.recommendationGenre = genre;
  const titles = getRecommendations(genre);
  await ctx.editMessageText(formatRecommendations(titles), {
    reply_markup: buildRecommendationKeyboard(),
    parse_mode: "HTML",
  });
});

composer.callbackQuery("recommande:surprise", async (ctx) => {
  await ctx.answerCallbackQuery();
  const titles = getRecommendations();
  await ctx.editMessageText(formatRecommendations(titles), {
    reply_markup: buildRecommendationKeyboard(),
    parse_mode: "HTML",
  });
});

composer.callbackQuery("recommande:other", async (ctx) => {
  await ctx.answerCallbackQuery();
  const titles = getRecommendations(ctx.session.recommendationGenre);
  await ctx.editMessageText(formatRecommendations(titles), {
    reply_markup: buildRecommendationKeyboard(),
    parse_mode: "HTML",
  });
});

composer.command("recommande", async (ctx) => {
  const titles = getRecommendations();
  await ctx.reply(formatRecommendations(titles), {
    reply_markup: buildRecommendationKeyboard(),
    parse_mode: "HTML",
  });
});

export default composer;
