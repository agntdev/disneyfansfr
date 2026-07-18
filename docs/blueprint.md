# DisneyFanBot — Bot specification

**Archetype:** community

**Voice:** chaleureux et informatif — write every user-facing message, button label, error, and empty state in this voice.

Bot Telegram en français pour un channel Disney dédié, permettant aux fans de rechercher des films/séries, obtenir des fiches détaillées, demander des recommandations, s'abonner à des alertes, et voir les titres populaires. Publie automatiquement des annonces dans le channel et fournit des réponses privées sur demande.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- fans francophones de Disney
- participants actifs d'un channel/serveur dédié

## Success criteria

- Traiter 1000+ requêtes de recherche par mois
- Générer 500+ recommandations personnalisées par semaine
- Envoyer 200+ notifications d'alerte par jour
- Maintenir un taux d'engagement supérieur à 70% sur les interactions

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Ouvrir le menu principal avec options de recherche, recommandations et alertes
- **/recherche** (command, actor: user, command: /recherche <titre>) — Rechercher un film/série par mot-clé
  - inputs: mot-clé
  - outputs: fiche courte avec bouton 'Voir détail'
- **/fiche** (command, actor: user, command: /fiche <titre>) — Afficher les détails complets d'un titre
  - inputs: titre
  - outputs: synopsis complet, casting, liens officiels
- **/recommande** (command, actor: user, command: /recommande) — Obtenir des suggestions basées sur des préférences
  - inputs: genre, période, âge
  - outputs: 3 recommandations avec mini-synopsis
- **/alerte** (command, actor: user, command: /alerte <titre|critère>) — S'abonner à des notifications
  - inputs: titre ou critère
  - outputs: confirmation d'abonnement
- **/top** (command, actor: user, command: /top) — Voir les titres les plus demandés
  - outputs: liste des titres populaires
- **Partager dans le channel** (button, actor: user, callback: share:channel) — Partager un titre dans le channel public
- **Recevoir en privé** (button, actor: user, callback: receive:private) — Demander une réponse détaillée en message privé
- **S'abonner aux mises à jour** (button, actor: user, callback: subscribe:updates) — Créer une alerte pour un titre spécifique

## Flows

### Recherche et détail
_Trigger:_ /recherche <titre>

1. Afficher fiche courte
2. Proposer 'Voir détail' via bouton
3. Afficher fiche complète avec options de partage

_Data touched:_ Titre, Utilisateur

### Recommandation
_Trigger:_ /recommande

1. Demander genre/préférences via bouton
2. Afficher 3 suggestions
3. Proposer 'Autres suggestions'

_Data touched:_ Utilisateur, Titre

### Alerte
_Trigger:_ /alerte <titre>

1. Valider le critère
2. Enregistrer l'abonnement
3. Confirmer via message

_Data touched:_ Utilisateur, Notification

### Top demandes
_Trigger:_ /top

1. Récupérer historique des requêtes
2. Générer liste classée
3. Afficher avec synopsis court

_Data touched:_ Utilisateur, Titre

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **Utilisateur** _(retention: persistent)_ — Membre actif du channel
  - fields: pseudo Telegram, historique de requêtes, abonnements/alertes
- **Titre** _(retention: persistent)_ — Film ou série Disney
  - fields: titre FR, titre original, année, synopsis FR, casting principal, durée/format, genre, âge recommandé, langues disponibles
- **Demande** _(retention: session)_ — Interaction utilisateur avec le bot
  - fields: type de requête, paramètres, statut
- **Notification** _(retention: persistent)_ — Alerte programmée
  - fields: type d'alerte, critères, destinataire

## Integrations

- **Telegram** (required) — API de messagerie et gestion des channels
- **Gestion des abonnements** (required) — Système de notifications programmées
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- Activer/désactiver les posts automatiques dans le channel
- Configurer les critères de filtrage des annonces
- Exporter le résumé quotidien/hebdo vers un administrateur spécifique

## Notifications

- Posts automatiques dans le channel pour nouveautés Disney+
- Messages privés pour résultats de recherche détaillés
- Résumé quotidien des demandes populaires pour l'administrateur

## Permissions & privacy

- Accès aux données de l'utilisateur uniquement pour gérer les abonnements
- Pas de partage de données avec des tiers
- Suppression des données à la demande

## Edge cases

- Requêtes vagues ou ambiguës
- Fautes de frappe dans les recherches
- Titres sans version française officielle
- Abonnements multiples pour un même utilisateur

## Required tests

- Valider le flux de recherche avec typo corrigée
- Tester la génération de 3 recommandations distinctes
- Vérifier le déclenchement des notifications programmées
- Simuler le partage dans le channel vs message privé

## Assumptions

- Les administrateurs reçoivent les résumés par défaut via message privé
- Le catalogue est en français avec indication des titres originaux
- Les erreurs de saisie sont tolérées dans les commandes de recherche
