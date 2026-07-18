import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard, registerMainMenuItem, paginate } from "../toolkit/index.js";
import { catalog, type DisneyTitle } from "../catalog.js";

registerMainMenuItem({ label: "🔥 Top titres", data: "top:show", order: 30 });

function buildTopList(titles: DisneyTitle[]): string {
  if (titles.length === 0) {
    return "Aucun titre pour le moment.";
  }
  const lines = titles.map(
    (t, i) =>
      `${i + 1}. <b>${t.titreFr}</b> (${t.annee}) — ${t.genre.join(", ")}\n` +
      `   <i>${t.synopsisFr.substring(0, 80)}…</i>`,
  );
  return `🔥 Les titres les plus populaires :\n\n${lines.join("\n\n")}`;
}

const composer = new Composer<Ctx>();

function showTop(ctx: Ctx, page: number) {
  const sorted = [...catalog].sort((a, b) => b.annee - a.annee);
  const pag = paginate(sorted, { page, perPage: 5, callbackPrefix: "top" });

  const text = buildTopList(pag.pageItems);
  const rows = pag.pageItems.map((t) => [
    inlineButton(`Voir ${t.titreFr}`, `fiche:${t.id}`),
  ]);

  const kb = inlineKeyboard([...rows, ...pag.controls.inline_keyboard]);
  return { text, kb };
}

composer.callbackQuery("top:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  const { text, kb } = showTop(ctx, 0);
  await ctx.editMessageText(text, { reply_markup: kb, parse_mode: "HTML" });
});

composer.callbackQuery(/^top:next:(\d+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const page = parseInt(ctx.match![1]);
  const { text, kb } = showTop(ctx, page);
  await ctx.editMessageText(text, { reply_markup: kb, parse_mode: "HTML" });
});

composer.callbackQuery(/^top:prev:(\d+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const page = parseInt(ctx.match![1]);
  const { text, kb } = showTop(ctx, page);
  await ctx.editMessageText(text, { reply_markup: kb, parse_mode: "HTML" });
});

composer.command("top", async (ctx) => {
  const { text, kb } = showTop(ctx, 0);
  await ctx.reply(text, { reply_markup: kb, parse_mode: "HTML" });
});

export default composer;
