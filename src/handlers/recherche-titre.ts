import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard, registerMainMenuItem } from "../toolkit/index.js";
import { searchCatalog, type DisneyTitle } from "../catalog.js";

registerMainMenuItem({ label: "🔍 Rechercher", data: "recherche:menu", order: 10 });

function formatResult(t: DisneyTitle): string {
  return `🎬 <b>${t.titreFr}</b> (${t.titreOriginal}, ${t.annee})\n` +
    `${t.genre.join(" · ")} • ${t.duree} • ${t.ageRecommande}\n\n` +
    `${t.synopsisFr.substring(0, 120)}…`;
}

function buildResultKeyboard(results: DisneyTitle[]): { text: string; kb: ReturnType<typeof inlineKeyboard> } {
  if (results.length === 0) {
    return {
      text: "Aucun résultat. Vérifie l'orthographe et réessaie.",
      kb: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    };
  }

  const lines = results.map((t, i) => `${i + 1}. 🎬 <b>${t.titreFr}</b> (${t.annee})`);
  const text = `🔍 Résultats (${results.length}) :\n\n${lines.join("\n")}`;

  const rows = results.map((t) => [
    inlineButton(`Voir ${t.titreFr}`, `fiche:${t.id}`),
  ]);
  rows.push([inlineButton("⬅️ Retour au menu", "menu:main")]);

  return { text, kb: inlineKeyboard(rows) };
}

const composer = new Composer<Ctx>();

composer.callbackQuery("recherche:menu", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    "🔍 Tape le nom d'un film ou d'une série Disney :",
    {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    },
  );
  ctx.session.step = "awaiting_search_query";
});

composer.command("recherche", async (ctx) => {
  const query = (ctx.message?.text ?? "").replace(/^\/recherche\s*/i, "").trim();
  if (!query) {
    await ctx.reply(
      "🔍 Tape le nom d'un film ou d'une série Disney :",
      { reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]) },
    );
    ctx.session.step = "awaiting_search_query";
    return;
  }
  const results = searchCatalog(query);
  const { text, kb } = buildResultKeyboard(results);
  await ctx.reply(text, { reply_markup: kb, parse_mode: "HTML" });
});

composer.on("message:text", async (ctx, next) => {
  if (ctx.session.step !== "awaiting_search_query") return next();
  const query = ctx.message.text.trim();
  ctx.session.step = undefined;
  const results = searchCatalog(query);
  const { text, kb } = buildResultKeyboard(results);
  await ctx.reply(text, { reply_markup: kb, parse_mode: "HTML" });
});

export default composer;
