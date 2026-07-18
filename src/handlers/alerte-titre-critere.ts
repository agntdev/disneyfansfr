import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard, registerMainMenuItem } from "../toolkit/index.js";
import { searchCatalog } from "../catalog.js";

registerMainMenuItem({ label: "🔔 Alertes", data: "alerte:menu", order: 40 });

const composer = new Composer<Ctx>();

composer.callbackQuery("alerte:menu", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    "🔔 Tu veux être notifié de quoi ?\n\n" +
    "Tape le nom d'un titre ou un critère (ex: « Animation », « 2024 ») :",
    {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]),
    },
  );
  ctx.session.step = "awaiting_alert_criterion";
});

composer.command("alerte", async (ctx) => {
  const criterion = (ctx.message?.text ?? "").replace(/^\/alerte\s*/i, "").trim();
  if (!criterion) {
    await ctx.reply(
      "🔔 Tape le nom d'un titre ou un critère pour t'abonner aux alertes :",
      { reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]) },
    );
    ctx.session.step = "awaiting_alert_criterion";
    return;
  }

  const matches = searchCatalog(criterion);
  const isTitle = matches.some(
    (t) => t.titreFr.toLowerCase() === criterion.toLowerCase(),
  );

  await ctx.reply(
    `🔔 Alerte enregistrée pour « ${criterion} » !\n\n` +
      (isTitle
        ? "Tu seras notifié quand il y aura du nouveau sur ce titre."
        : "Tu seras notifié quand un titre correspondant sera disponible."),
    { reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]) },
  );
});

composer.on("message:text", async (ctx, next) => {
  if (ctx.session.step !== "awaiting_alert_criterion") return next();
  const criterion = ctx.message.text.trim();
  ctx.session.step = undefined;

  const matches = searchCatalog(criterion);
  const isTitle = matches.some(
    (t) => t.titreFr.toLowerCase() === criterion.toLowerCase(),
  );

  await ctx.reply(
    `🔔 Alerte enregistrée pour « ${criterion} » !\n\n` +
      (isTitle
        ? "Tu seras notifié quand il y aura du nouveau sur ce titre."
        : "Tu seras notifié quand un titre correspondant sera disponible."),
    { reply_markup: inlineKeyboard([[inlineButton("⬅️ Retour au menu", "menu:main")]]) },
  );
});

export default composer;
