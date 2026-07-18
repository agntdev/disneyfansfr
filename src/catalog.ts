export interface DisneyTitle {
  id: string;
  titreFr: string;
  titreOriginal: string;
  annee: number;
  synopsisFr: string;
  casting: string[];
  duree: string;
  genre: string[];
  ageRecommande: string;
  langues: string[];
  type: "film" | "serie";
}

export const catalog: DisneyTitle[] = [
  {
    id: "le-roi-lion",
    titreFr: "Le Roi Lion",
    titreOriginal: "The Lion King",
    annee: 1994,
    synopsisFr: "Simba, un jeune lionceau, est né pour devenir roi. Mais la jalousie de son oncle Scar plonge la Terre des Lions dans le chaos. Simba devra affronter son passé pour reconquérir son trône.",
    casting: ["Matthew Broderick", "James Earl Jones", "Jeremy Irons"],
    duree: "1h28",
    genre: ["Animation", "Aventure", "Drame"],
    ageRecommande: "6+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "la-reine-des-neiges",
    titreFr: "La Reine des Neiges",
    titreOriginal: "Frozen",
    annee: 2013,
    synopsisFr: "Elsa, reine d'Arendelle, possède un pouvoir secret : elle crée de la glace et du givre. Lorsque sa magie libère un hiver éternel, sa sœur Anna devra la retraver pour sauver le royaume.",
    casting: ["Kristen Bell", "Idina Menzel", "Jonathan Groff"],
    duree: "1h42",
    genre: ["Animation", "Comédie", "Fantaisie"],
    ageRecommande: "5+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "mickey-mouse-clubhouse",
    titreFr: "La Clubhouse de Mickey",
    titreOriginal: "Mickey Mouse Clubhouse",
    annee: 2006,
    synopsisFr: "Mickey et ses amis résolvent des problèmes avec l'aide du Topsy-Turvy et des téléspectateurs. Chaque épisode est une aventure interactive et éducative pour les tout-petits.",
    casting: ["Bret Iwan", "Kaitlyn Robrock", "Bill Farmer"],
    duree: "25 min",
    genre: ["Animation", "Comédie", "Éducation"],
    ageRecommande: "2+",
    langues: ["Français", "Anglais"],
    type: "serie",
  },
  {
    id: "toy-story",
    titreFr: "Toy Story",
    titreOriginal: "Toy Story",
    annee: 1995,
    synopsisFr: "Woody, un cow-boy jouet, voit son statut menacé par l'arrivée de Buzz l'Éclair, un jouet spatial moderne. Les deux rivaux devront s'allier pour retrouver leur propriétaire Andy.",
    casting: ["Tom Hanks", "Tim Allen", "Don Rickles"],
    duree: "1h21",
    genre: ["Animation", "Comédie", "Aventure"],
    ageRecommande: "5+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "aladdin",
    titreFr: "Aladdin",
    titreOriginal: "Aladdin",
    annee: 1992,
    synopsisFr: "Aladdin, un jeune voleur des rues, trouve une lampe magique contenant un génie qui exaucera trois vœux. Il tombe amoureux de la princesse Jasmine et doit affronter le sinistre Jafar.",
    casting: ["Scott Weinger", "Robin Williams", "Linda Larkin"],
    duree: "1h30",
    genre: ["Animation", "Aventure", "Comédie"],
    ageRecommande: "6+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "les-miss-marmelade",
    titreFr: "Les Miss Marmelade",
    titreOriginal: "The Proud Family",
    annee: 2001,
    synopsisFr: "Penny Proud, une adolescente de 14 ans, navigue entre les défis de l'adolescence, sa famille et ses meilleures amies. Les situations hilarantes se multiplient au quotidien.",
    casting: ["Kyla Pratt", "Tommy Davidson", "Paula Jivén"],
    duree: "22 min",
    genre: ["Animation", "Comédie"],
    ageRecommande: "7+",
    langues: ["Français", "Anglais"],
    type: "serie",
  },
  {
    id: "la-petite-mermaid",
    titreFr: "La Petite Sirène",
    titreOriginal: "The Little Mermaid",
    annee: 1989,
    synopsisFr: "Ariel, une jeune sirène, rêve de vivre parmi les humains. Elle fait un marché avec la sorcière Ursula : ses jambes contre sa voix. Elle devra séduire le prince Éric avant le coucher du soleil.",
    casting: ["Jodi Benson", "Samuel E. Wright", "Pat Carroll"],
    duree: "1h23",
    genre: ["Animation", "Fantaisie", "Comédie"],
    ageRecommande: "5+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "marvel-avengers",
    titreFr: "Avengers",
    titreOriginal: "The Avengers",
    annee: 2012,
    synopsisFr: "Lorsque le dieu Loki menace la Terre, Nick Fury rassemble Iron Man, Captain America, Thor, la Veuve Noire, Hulk et Hawkeye pour former les Avengers et sauver le monde.",
    casting: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    duree: "2h23",
    genre: ["Action", "Science-fiction", "Aventure"],
    ageRecommande: "10+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "mandalorian",
    titreFr: "The Mandalorian",
    titreOriginal: "The Mandalorian",
    annee: 2019,
    synopsisFr: "Un chasseur de primes solitaire parcourt les confins de la galaxie, loin de l'autorité de la Nouvelle République. Il rencontre un mystérieux enfant qu'il décide de protéger à tout prix.",
    casting: ["Pedro Pascal", "Giancarlo Esposito", "Carl Weathers"],
    duree: "30 min",
    genre: ["Science-fiction", "Action", "Aventure"],
    ageRecommande: "12+",
    langues: ["Français", "Anglais"],
    type: "serie",
  },
  {
    id: "raiponce",
    titreFr: "Raiponce : La Série",
    titreOriginal: "Tangled: The Series",
    annee: 2017,
    synopsisFr: "Raiponce découvre le monde extérieur après des années enfermée dans une tour. Accompagnée de Flynn Rider et de ses amis Pascal et Maximus, elle vit de nouvelles aventures à Corona.",
    casting: ["Mandy Moore", "Zachary Levi", "Eden Espinosa"],
    duree: "22 min",
    genre: ["Animation", "Comédie", "Aventure"],
    ageRecommande: "5+",
    langues: ["Français", "Anglais"],
    type: "serie",
  },
  {
    id: "finding-nemo",
    titreFr: "Trouver Nemo",
    titreOriginal: "Finding Nemo",
    annee: 2003,
    synopsisFr: "Nemo, un petit poisson-clown curieux, se fait capturer par un plongeur. Son père Marlin entreprend un voyage épique à travers l'océan pour le retrouver, aidé par la poisson Dory.",
    casting: ["Albert Brooks", "Ellen DeGeneres", "Alexander Gould"],
    duree: "1h40",
    genre: ["Animation", "Comédie", "Aventure"],
    ageRecommande: "5+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "encanto",
    titreFr: "Encanto",
    titreOriginal: "Encanto – La Magie des jours ordinaires",
    annee: 2021,
    synopsisFr: "Mirabel Madrigal est la seule membre de sa famille à ne pas avoir reçu de don magique. Lorsque la magie de la maison menace de disparaître, elle devra retrouver la source de ce pouvoir.",
    casting: ["Stephanie Beatriz", "María Cecilia Botero", "John Leguizamo"],
    duree: "1h39",
    genre: ["Animation", "Comédie", "Fantaisie"],
    ageRecommande: "6+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "moana",
    titreFr: "Moana",
    titreOriginal: "Moana",
    annee: 2016,
    synopsisFr: "Moana, fille d'un chef polynésien, entreprend une odyssée en mer pour retrouver la déesse Te Fiti et sauver son île. Accompagnée du demi-dieu Maui, elle affronte les océans.",
    casting: ["Auli'i Cravalho", "Dwayne Johnson", "Rachel House"],
    duree: "1h47",
    genre: ["Animation", "Aventure", "Comédie"],
    ageRecommande: "6+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "mon-incroyable-famille",
    titreFr: "Les Indestructibles 2",
    titreOriginal: "Incredibles 2",
    annee: 2018,
    synopsisFr: "Helen Parr est recrutée pour une mission secrète pendant que Bob s'occupe des enfants à la maison. Mais un nouveau villain menace le monde et la famille devra réunir ses forces.",
    casting: ["Craig T. Nelson", "Holly Hunter", "Sarah Vowell"],
    duree: "1h58",
    genre: ["Animation", "Action", "Comédie"],
    ageRecommande: "8+",
    langues: ["Français", "Anglais"],
    type: "film",
  },
  {
    id: "star-wars-clone-wars",
    titreFr: "Star Wars : Les Guerres des Clones",
    titreOriginal: "Star Wars: The Clone Wars",
    annee: 2008,
    synopsisFr: "Pendant la guerre des clones, Anakin Skywalker et son apprenti Ahsoka Tano combattent les forces séparatistes aux côtés du maître Obi-Wan Kenobi sur de nombreux fronts galactiques.",
    casting: ["Matt Lanter", "Ashley Eckstein", "James Arnold Taylor"],
    duree: "22 min",
    genre: ["Animation", "Action", "Science-fiction"],
    ageRecommande: "10+",
    langues: ["Français", "Anglais"],
    type: "serie",
  },
];

export function searchCatalog(query: string): DisneyTitle[] {
  const q = query.toLowerCase().trim();
  return catalog.filter(
    (t) =>
      t.titreFr.toLowerCase().includes(q) ||
      t.titreOriginal.toLowerCase().includes(q) ||
      t.genre.some((g) => g.toLowerCase().includes(q)),
  );
}

export function getTitleById(id: string): DisneyTitle | undefined {
  return catalog.find((t) => t.id === id);
}

export function getPopularTitles(): DisneyTitle[] {
  return [...catalog].sort(() => 0.5 - Math.random()).slice(0, 5);
}

export function getRecommendations(genre?: string, annee?: number): DisneyTitle[] {
  let filtered = [...catalog];
  if (genre) {
    const g = genre.toLowerCase();
    filtered = filtered.filter((t) => t.genre.some((tg) => tg.toLowerCase().includes(g)));
  }
  if (annee) {
    filtered = filtered.filter((t) => Math.abs(t.annee - annee) <= 10);
  }
  return filtered.slice(0, 3);
}

export function getCatalogByGenre(): string[] {
  const genres = new Set<string>();
  for (const t of catalog) {
    for (const g of t.genre) genres.add(g);
  }
  return [...genres].sort();
}
