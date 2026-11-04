// DEBLOKE Ajan : de lang (Kreyòl / Français).
// App la ekri an kreyòl. Lè ajan an chwazi "Français", tout tèks ki parèt sou ekran an
// (paj, mesaj, konfimasyon) tradui ak diksyonè sa a. Pou ajoute yon tradiksyon : mete
// yon liy [kreyòl, franse] nan FR (fraz ki pi long yo pase anvan).
(function () {
  "use strict";
  var LANG = "ht";
  try { LANG = localStorage.getItem("dbk_lang") || "ht"; } catch (e) {}
  window.LANG = LANG;
  window.setLang = function (l) { try { localStorage.setItem("dbk_lang", l); } catch (e) {} location.reload(); };
  document.documentElement.lang = LANG === "fr" ? "fr" : "ht";
  if (LANG !== "fr") { window.tr = function (t) { return t; }; return; }

  var pl = function (n, one, many) { return Number(String(n).replace(/\s/g, "")) > 1 ? many : one; };
  // Fraz ak chif (pase anvan diksyonè a)
  var RX = [
    [/\bJou (\d+) sou (\d+)/g, "Jour $1 sur $2"],
    [/\bJou (\d+) ?\/ ?(\d+)/g, "Jour $1/$2"],
    [/\bJou konsome\b/g, "Jours consommés"],
    [/(\d+) jou\b/g, function (m, n) { return n + " " + pl(n, "jour", "jours"); }],
    [/(\d+) operasyon\b/g, function (m, n) { return n + " " + pl(n, "opération", "opérations"); }],
    [/(\d+) vizit\b/g, function (m, n) { return n + " " + pl(n, "visite", "visites"); }],
    [/(\d+) moun\b/g, function (m, n) { return n + " " + pl(n, "personne", "personnes"); }],
    [/(\d+) cycle aktif\b/g, function (m, n) { return n + " " + pl(n, "cycle actif", "cycles actifs"); }],
    [/(\d+) kliyan\b/gi, function (m, n) { return n + " " + pl(n, "client", "clients"); }],
    [/(\d+) frè\b/g, "$1 frais"],
    [/(\d+) penalite\b/g, function (m, n) { return n + " " + pl(n, "pénalité", "pénalités"); }],
    [/(\d+) ?è (\d+)/g, "$1 h $2"],
    [/\/jou\b/g, "/jour"],
    [/\/ jou\b/g, "/ jour"],
    [/ pa jou\b/g, " par jour"]
  ];
  var FR = [
    // Navigasyon / antèt
    ["Jodi a", "Aujourd'hui"], ["jodi a", "aujourd'hui"], ["Kliyan", "Clients"], ["Tranzaksyon", "Transactions"], ["Tranz.", "Trans."],
    ["Rapò", "Rapport"], ["Ekip", "Équipe"], ["Kat", "Carte"], ["Senk", "Synchro"],
    ["Sou entènèt", "En ligne"], ["San entènèt", "Hors ligne"], ["Ap senkronize…", "Synchronisation…"],
    ["BAZ TÈS · done yo pa reyèl", "BASE TEST · données fictives"],
    ["Nouvo vèsyon app la disponib · peze la a", "Nouvelle version disponible · touchez ici"],
    // Koneksyon
    ["Nimewo telefòn", "Numéro de téléphone"], ["Modpas", "Mot de passe"], ["Konekte", "Se connecter"], ["Ap konekte…", "Connexion…"],
    ["Premye koneksyon an bezwen entènèt. Apre sa, app la mache san entènèt.", "La première connexion nécessite Internet. Ensuite, l'application fonctionne hors ligne."],
    ["Premye koneksyon an bezwen entènèt.", "La première connexion nécessite Internet."],
    ["Telefòn oswa modpas pa bon.", "Téléphone ou mot de passe incorrect."], ["Mete modpas ou.", "Entrez votre mot de passe."],
    ["Nimewo telefòn nan pa bon (8 chif).", "Numéro de téléphone invalide (8 chiffres)."], ["Nimewo telefòn nan pa bon.", "Numéro de téléphone invalide."],
    ["Telefòn nan pa bon.", "Téléphone invalide."], ["Kont sa a dezaktive.", "Ce compte est désactivé."],
    ["Kont sa a pa yon kont Debloke aktif.", "Ce compte n'est pas un compte Debloke actif."],
    ["Sesyon an fini. Konekte ankò (done ki pa voye yo ap rete).", "Session expirée. Reconnectez-vous (les données non envoyées sont conservées)."],
    ["Ou pa konekte", "Vous n'êtes pas connecté"],
    // Jodi a
    ["Kolekte jodi a", "Collecte du jour"], ["Kolekte ekip la", "Collecte de l'équipe"], ["Kolekte", "Collecte"],
    ["Dènye senk :", "Dernière synchro :"], ["Dènye senk", "Dernière synchro"],
    ["Cycle aktif", "Cycles actifs"], ["CYCLE AKTIF", "CYCLES ACTIFS"],
    ["Pozisyon biznis pou anrejistre", "Position du commerce à enregistrer"],
    ["Pa gen cycle aktif. Senkronize lè w gen entènèt.", "Aucun cycle actif. Synchronisez quand vous avez Internet."],
    ["Pa gen cycle aktif. Peze « ➕ Nouvo cycle ».", "Aucun cycle actif. Touchez « ➕ Nouveau cycle »."],
    ["Pa gen cycle aktif.", "Aucun cycle actif."], ["Tout ekip la", "Toute l'équipe"], ["Tout", "Tous"],
    ["Reta remèt", "Retard remboursement"], ["Reta", "Retard"], ["Ajou", "À jour"], ["Pou debloke", "À débloquer"],
    ["frè peye", "frais payés"], ["Pou remèt", "À rembourser"], ["pou remèt", "à rembourser"], ["fen", "fin"],
    ["Nouvo cycle (ap tann)", "Nouveau cycle (en attente)"],
    // Kliyan
    ["Non, telefòn oswa kòd kliyan…", "Nom, téléphone ou code client…"], ["Kliyan toupre m", "Clients près de moi"],
    ["Kliyan mwen", "Mes clients"], ["Pi pre", "Plus proche"], ["Nan tout baz la", "Dans toute la base"],
    ["Rechèch nan tout baz la bezwen entènèt.", "La recherche dans toute la base nécessite Internet."],
    ["Tape omwen 3 lèt oswa yon telefòn pou chèche nan tout baz la, oswa peze 📍 pou kliyan toupre w.", "Tapez au moins 3 lettres ou un téléphone pour chercher dans toute la base, ou touchez 📍 pour les clients proches."],
    ["Kliyan toupre w", "Clients proches"], ["Okenn nan kliyan ou yo.", "Aucun de vos clients."], ["Pa jwenn lòt moun ki sanble.", "Aucune autre personne similaire."],
    ["Ap chèche…", "Recherche…"], ["Eseye ankò", "Réessayer"], ["Nouvo kliyan", "Nouveau client"], ["Kliyan ou", "Votre client"],
    ["Lòt ajan", "Autre agent"], ["Fich kliyan", "Fiche client"], ["Biznis kliyan an", "Commerce du client"], ["Itinerè", "Itinéraire"],
    ["Kliyan sa a nan pòtfèy yon lòt ajan. Mande manager a fè yon transfè.", "Ce client appartient à un autre agent. Demandez un transfert au manager."],
    ["Verifye se menm moun nan (foto, non, kòd, telefòn) anvan w ajoute l.", "Vérifiez que c'est la même personne (photo, nom, code, téléphone) avant de l'ajouter."],
    ["Se li · Ajoute l epi kreye yon cycle", "C'est elle/lui · Ajouter et créer un cycle"],
    ["ajoute nan kliyan ou yo", "ajouté(e) à vos clients"],
    ["Si se youn ladan yo, chwazi l olye w kreye yon nouvo kliyan :", "Si c'est l'une de ces personnes, choisissez-la au lieu de créer un nouveau client :"],
    ["Moun sa a ka deja nan baz la.", "Cette personne est peut-être déjà dans la base."],
    ["Fòk ou gen entènèt pou ajoute yon moun ki deja nan baz la.", "Il faut Internet pour ajouter une personne déjà dans la base."],
    ["Fòk ou gen entènèt pou sa.", "Il faut Internet pour cela."], ["Bezwen entènèt.", "Internet nécessaire."],
    ["Ou gen yon kliyan deja ak telefòn sa a.", "Vous avez déjà un client avec ce téléphone."],
    ["Kliyan an deja nan men ajan sa a.", "Ce client est déjà chez cet agent."], ["Kliyan an poko parèt. Senkronize.", "Le client n'apparaît pas encore. Synchronisez."],
    // Nouvo kliyan
    ["Prenon *", "Prénom *"], ["Non *", "Nom *"], ["Telefòn *", "Téléphone *"], ["Telefòn", "Téléphone"], ["NIF / CIN", "NIF / CIN"],
    ["Aktivite", "Activité"], ["Kote li travay", "Lieu de travail"], ["Adrès / repè", "Adresse / repère"], ["Kote", "Lieu"],
    ["Pran foto", "Prendre une photo"], ["Foto kliyan an", "Photo du client"], ["Foto kliyan", "Photo client"],
    ["Foto a ap parèt lè gen entènèt", "La photo apparaîtra avec Internet"], ["Foto a pa ka li.", "Impossible de lire la photo."],
    ["Foto a poko disponib (bezwen entènèt).", "Photo pas encore disponible (Internet nécessaire)."],
    ["Mwen nan biznis kliyan an kounye a", "Je suis au commerce du client maintenant"], ["Mwen nan biznis li kounye a", "Je suis à son commerce maintenant"],
    ["Pozisyon GPS biznis la ap anrejistre. Si w pa la, w ap fè l pita.", "La position GPS du commerce sera enregistrée. Sinon, vous le ferez plus tard."],
    ["Anrejistre pozisyon GPS biznis la.", "Enregistrer la position GPS du commerce."],
    ["Ouvri yon kont Debloke tou", "Ouvrir aussi un compte Debloke"], ["Ouvri yon kont Debloke", "Ouvrir un compte Debloke"],
    ["Anrejistre kliyan an", "Enregistrer le client"], ["Kliyan anrejistre", "Client enregistré"],
    ["Mete prenon ak non kliyan an.", "Entrez le prénom et le nom du client."], ["Mete non an.", "Entrez le nom."],
    ["GPS la poko bon. Anrejistre kliyan an san pozisyon (w ap fè l pita)?", "Le GPS n'est pas encore précis. Enregistrer le client sans position (à faire plus tard) ?"],
    ["Pa gen kliyan. Kreye yon kliyan an premye.", "Aucun client. Créez d'abord un client."],
    // GPS
    ["Ap chèche pozisyon GPS…", "Recherche de la position GPS…"], ["Ap chèche pozisyon w… (aktive GPS la)", "Recherche de votre position… (activez le GPS)"],
    ["Ap chèche pozisyon w…", "Recherche de votre position…"], ["Ap tann pozisyon GPS ou…", "En attente de votre position GPS…"],
    ["Pozisyon anrejistre", "Position enregistrée"], ["Pozisyon pa presi ase", "Position pas assez précise"], ["GPS pa presi ase", "GPS pas assez précis"],
    ["GPS la pa jwenn pozisyon. Ale deyò oswa eseye ankò.", "Le GPS ne trouve pas de position. Sortez ou réessayez."],
    ["Ou pa bay app la otorizasyon GPS. Aktive l nan paramèt telefòn nan.", "Vous n'avez pas autorisé le GPS. Activez-le dans les réglages du téléphone."],
    ["Telefòn sa a pa gen GPS.", "Ce téléphone n'a pas de GPS."], ["Pozisyon", "Position"], ["Li anrejistre", "Enregistrée"], ["Anrejistre", "Enregistrer"], ["Pou anrejistre", "À enregistrer"],
    ["Korije pozisyon biznis la (mwen la kounye a)", "Corriger la position du commerce (j'y suis maintenant)"],
    ["Mwen nan biznis li : anrejistre pozisyon an", "Je suis à son commerce : enregistrer la position"],
    ["Ranplase pozisyon biznis la ak kote w ye kounye a?", "Remplacer la position du commerce par votre position actuelle ?"],
    ["Èske w nan biznis kliyan an kounye a?\n\nOK = wi, anrejistre pozisyon GPS la\nAnile = non, m ap anrejistre l pita", "Êtes-vous au commerce du client maintenant ?\n\nOK = oui, enregistrer la position GPS\nAnnuler = non, je l'enregistrerai plus tard"],
    ["Kont lan ap ouvri san GPS.", "Le compte sera ouvert sans GPS."], ["Kont lan anrejistre", "Compte enregistré"],
    ["Pozisyon ap anrejistre", "Position enregistrée en continu"], ["GPS pa aktif", "GPS inactif"],
    // Kont / cycle
    ["Kont", "Compte"], ["KONT", "COMPTE"], ["Pa gen kont.", "Aucun compte."], ["Pa gen kont", "Aucun compte"], ["Nouvo kont (ap tann)", "Nouveau compte (en attente)"],
    ["Nouvo kont · ap ouvri otomatikman", "Nouveau compte · ouverture automatique"], ["Nouvo kont", "Nouveau compte"], ["Pa jwenn kont.", "Aucun compte trouvé."],
    ["Pa gen cycle.", "Aucun cycle."], ["Nouvo cycle", "Nouveau cycle"], ["Cycle anvan", "Cycles précédents"], ["dènye a :", "dernier :"],
    ["Montan, jou ak frè yo soti nan dènye cycle a. Chanje sa ki pa bon.", "Montant, jours et frais repris du dernier cycle. Modifiez si nécessaire."],
    ["Montan pou debloke (HTG) *", "Montant à débloquer (HTG) *"], ["Konbyen jou *", "Nombre de jours *"], ["Frè pa jou (HTG) *", "Frais par jour (HTG) *"],
    ["Frè pa jou", "Frais par jour"], ["Dat kòmansman", "Date de début"], ["Pa konte dimanch", "Ne pas compter le dimanche"],
    ["M ap bay kliyan an kòb la kounye a", "Je remets l'argent au client maintenant"], ["Déblocage a ap anrejistre an menm tan.", "Le déblocage sera enregistré en même temps."],
    ["Kreye cycle la · debloke", "Créer le cycle · débloquer"], ["Kreye cycle la", "Créer le cycle"], ["Cycle kreye", "Cycle créé"], ["Limit kont lan", "Limite du compte"],
    ["Limit", "Limite"], ["Frè total", "Frais totaux"], ["Fen cycle", "Fin du cycle"], ["Kliyan an ap remèt", "Le client remboursera"],
    ["Si li fini bone, li peye sèlman jou li konsome yo.", "S'il termine plus tôt, il ne paie que les jours consommés."],
    ["Chwazi frè pa jou a.", "Choisissez les frais par jour."], ["Chwazi dat kòmansman an.", "Choisissez la date de début."], ["Mete montan an.", "Entrez le montant."],
    ["Montan an depase limit kont lan", "Le montant dépasse la limite du compte"], ["Chanje kont", "Changer de compte"], ["Kont kliyan *", "Compte client *"],
    ["W ap bay kliyan an", "Vous remettez au client"], ["Konfime?", "Confirmer ?"],
    ["Fon debloke", "Fonds débloqués"], ["Frè dwe", "Frais dus"], ["Frè peye", "Frais payés"], ["Frè an reta", "Frais en retard"],
    ["Peye frè", "Payer frais"], ["Remèt fon", "Remboursement"], ["Debloke", "Déblocage"], ["Penalite", "Pénalité"], ["Remèt", "Remboursement"],
    ["Kliyan an p ap la yon jou", "Le client sera absent un jour"], ["Fèmen cycle la (kliyan an fini)", "Clôturer le cycle (client terminé)"],
    ["Dènye operasyon", "Dernières opérations"], ["Okenn.", "Aucune."], ["Cycle fèmen", "Cycle clôturé"], ["Fèmen cycle ·", "Clôturer le cycle ·"],
    ["Kliyan an peye sèlman jou li konsome yo", "Le client ne paie que les jours consommés"],
    ["Kliyan an poko remèt tout fon an (rete", "Le client n'a pas encore tout remboursé (reste"], ["Anrejistre remèt fon an anvan.", "Enregistrez d'abord le remboursement."],
    ["frè ki pa peye.", "de frais impayés."], ["fon pou remèt.", "de fonds à rembourser."], ["Gen", "Il y a"], ["Rete", "Reste"],
    ["Jou kliyan an p ap la", "Jour d'absence du client"], ["Jou sa a p ap konte nan frè yo.", "Ce jour ne sera pas compté dans les frais."],
    ["Jou off anrejistre", "Jour d'absence enregistré"], ["Jou off", "Jour off"], ["Chwazi dat la.", "Choisissez la date."],
    ["gen yon cycle ki poko fèmen. Fèmen l anvan.", "a un cycle non clôturé. Clôturez-le d'abord."], ["cycle sa a", "ce cycle"],
    // Peman
    ["Gen", "Il y a"], ["an reta ·", "en retard ·"], ["an reta", "en retard"], ["Penalite pou reta", "Pénalité de retard"], ["pou debloke", "à débloquer"],
    ["Referans / kòmantè", "Référence / commentaire"], ["Referans (si se MonCash, NatCash…)", "Référence (MonCash, NatCash…)"], ["Kòmantè", "Commentaire"],
    ["Mete yon montan.", "Entrez un montant."], ["Montan an depase sa ki rete pou debloke", "Le montant dépasse le reste à débloquer"],
    ["Montan an plis pase sa kliyan an dwe remèt", "Le montant dépasse ce que le client doit rembourser"], ["Kontinye?", "Continuer ?"],
    ["Mòd peman", "Mode de paiement"], ["Montan", "Montant"], ["Efase", "Effacer"],
    ["Paiement frais", "Paiement frais"], ["anrejistre", "enregistré"],
    // Tranzaksyon
    ["Non, kòd, nimewo kont oswa telefòn…", "Nom, code, numéro de compte ou téléphone…"], ["Kont aktif", "Comptes actifs"], ["Istorik", "Historique"],
    ["Pa gen operasyon pou peryòd sa a.", "Aucune opération pour cette période."], ["Frè kolekte", "Frais collectés"], ["Fon remèt", "Fonds remboursés"],
    ["Renouvle", "Renouveler"], ["Pa ajan", "Par agent"],
    // Kat
    ["Pakou optimize", "Itinéraire optimisé"], ["Pakou ajan", "Parcours agent"], ["Wout optimize ·", "Itinéraire optimisé ·"], ["cycle aktif", "cycles actifs"],
    ["tout kliyan", "tous les clients"], ["an moto ·", "à moto ·"], ["min a pye", "min à pied"], ["a pye", "à pied"], ["an moto", "à moto"],
    ["Kòmanse wout la (Google Maps)", "Démarrer l'itinéraire (Google Maps)"], ["Lòd vizit la", "Ordre des visites"], ["Premye kliyan", "Premier client"],
    ["Depa :", "Départ :"], ["Kote w ye kounye a", "Votre position actuelle"], ["Dènye pozisyon :", "Dernière position :"], ["Dènye pozisyon", "Dernière position"],
    ["Aktive GPS la pou pakou a kòmanse kote w ye.", "Activez le GPS pour démarrer l'itinéraire depuis votre position."],
    ["Tan yo se estimasyon (wout ≈ 1,3 × distans an liy dwat), san tan pou fè koleksyon an.", "Les temps sont estimés (route ≈ 1,3 × distance à vol d'oiseau), sans le temps de collecte."],
    ["Kliyan sou kat la", "Clients sur la carte"], ["An reta", "En retard"], ["San GPS", "Sans GPS"], ["San cycle", "Sans cycle"],
    ["Kliyan ki pi pre w", "Clients les plus proches"], ["Kote ajan yo ye", "Position des agents"], ["Kat la pa ka chaje.", "Impossible de charger la carte."],
    ["Pa gen kliyan ki gen pozisyon GPS", "Aucun client avec position GPS"], ["chwazi yon ajan", "choisissez un agent"], ["Kòmanse", "Début"],
    ["Distans pakouri", "Distance parcourue"], ["Vizit kliyan", "Visites clients"], ["Tan bò kliyan", "Temps chez les clients"], ["Tan sou teren", "Temps sur le terrain"],
    ["Yon vizit = ajan an rete omwen 3 min nan menm kote a (± 40 m), a mwens pase 80 m de yon kliyan.", "Une visite = l'agent reste au moins 3 min au même endroit (± 40 m), à moins de 80 m d'un client."],
    ["Pa gen kanpe detekte.", "Aucun arrêt détecté."], ["Kanpe", "Arrêt"], ["Pa gen pozisyon", "Aucune position"], ["Pa gen pozisyon pou", "Aucune position pour"],
    ["app la te fèmen oswa pa t gen siyal GPS", "application fermée ou pas de signal GPS"], ["pa toupre okenn kliyan", "près d'aucun client"],
    ["Ajan an dwe gen app la louvri pou pakou a anrejistre.", "L'agent doit garder l'application ouverte pour enregistrer le parcours."],
    ["Ap chaje pakou a…", "Chargement du parcours…"], ["Pakou ajan an bezwen entènèt.", "Le parcours de l'agent nécessite Internet."], ["nan dat sa a", "à cette date"],
    ["pa gen operasyon", "aucune opération"],
    // Ekip
    ["Nouvo kont anplwaye", "Nouveau compte employé"], ["Non konplè", "Nom complet"], ["Wòl", "Rôle"], ["Modpas (8 karaktè omwen)", "Mot de passe (8 caractères min.)"],
    ["Kreye kont lan", "Créer le compte"], ["Nouvo modpas pou", "Nouveau mot de passe pour"], ["Nouvo modpas", "Nouveau mot de passe"],
    ["Modpas chanje", "Mot de passe changé"], ["Bay moun nan li.", "Communiquez-le à la personne."], ["Modpas la dwe gen 8 karaktè omwen.", "Le mot de passe doit avoir au moins 8 caractères."],
    ["Modpas la twò kout.", "Mot de passe trop court."], ["Responsab liy", "Responsable de ligne"],
    ["Ajan ki p ap la", "Agent absent"], ["Ajan k ap ranplase l", "Agent remplaçant"], ["Kreye ranplasman an", "Créer le remplacement"],
    ["Ranplasman anrejistre", "Remplacement enregistré"], ["Anile ranplasman sa a?", "Annuler ce remplacement ?"], ["Anile ranplasman", "Annuler le remplacement"],
    ["Pa gen ranplasman.", "Aucun remplacement."], ["Se pa menm ajan an ki ka ranplase tèt li.", "Un agent ne peut pas se remplacer lui-même."],
    ["Chwazi 2 ajan yo.", "Choisissez les 2 agents."], ["Dat yo pa bon.", "Dates invalides."], ["Transfè yon kliyan", "Transférer un client"],
    ["Transfere kliyan an", "Transférer le client"], ["Transfè anrejistre", "Transfert enregistré"], ["Transfè", "Transfert"], ["Nouvo ajan", "Nouvel agent"],
    ["Chwazi kliyan an ak nouvo ajan an.", "Choisissez le client et le nouvel agent."], ["Chwazi yon ajan.", "Choisissez un agent."], ["Chwazi…", "Choisir…"],
    ["A verifye", "À vérifier"], ["Nouvo moun", "Nouvelle personne"], ["Konekte pa NIF", "Lié par NIF"], ["Konekte pa telefòn", "Lié par téléphone"],
    ["telefòn oswa NIF sa a egziste deja pou lòt moun", "ce téléphone ou NIF existe déjà pour une autre personne"], ["Doublon", "Doublon"], ["Ajan", "Agent"],
    ["Dezaktive", "Désactiver"], ["Reaktive", "Réactiver"], ["Aktif", "Actif"], ["Inaktif", "Inactif"],
    // Senk
    ["Senkronizasyon", "Synchronisation"], ["Entènèt", "Internet"], ["wi", "oui"], ["non", "non"], ["Ap tann", "En attente"],
    ["Senkronize kounye a", "Synchroniser maintenant"], ["Operasyon k ap tann", "Opérations en attente"], ["Tout done yo voye.", "Toutes les données sont envoyées."],
    ["Retire operasyon sa a? Li p ap janm voye.", "Retirer cette opération ? Elle ne sera jamais envoyée."], ["Retire", "Retirer"],
    ["Non", "Nom"], ["Dekonekte", "Se déconnecter"], ["Vèsyon app la :", "Version de l'application :"], ["Tèm app la", "Thème de l'application"],
    ["Lang app la", "Langue de l'application"], ["Klè", "Clair"], ["Nwit", "Nuit"], ["Mache", "Marché"],
    ["operasyon poko voye. Si w dekonekte, yo ap rete sou telefòn nan epi y ap voye lè w konekte ankò. Kontinye?", "opération(s) non envoyée(s). Si vous vous déconnectez, elles resteront sur le téléphone et seront envoyées à la prochaine connexion. Continuer ?"],
    ["Tout bagay ajou", "Tout est à jour"], ["operasyon voye", "opération(s) envoyée(s)"], ["operasyon pa pase. Gade nan Senk.", "opération(s) en échec. Voir Synchro."],
    ["Pa gen entènèt. Done yo ap voye lè entènèt tounen.", "Pas d'Internet. Les données seront envoyées au retour d'Internet."],
    ["ap voye lè entènèt tounen", "envoi au retour d'Internet"], ["Ap tann entènèt", "En attente d'Internet"], ["Pa gen koneksyon", "Pas de connexion"],
    ["ap tann", "en attente"], ["Ap voye", "Envoi"], ["Erè", "Erreur"], ["Fèt", "Fait"], ["Anile", "Annuler"], ["Fèmen", "Fermer"], ["Korije", "Corriger"],
    // Rapò
    ["Pataje", "Partager"], ["Avan yè", "Avant-hier"], ["Yè", "Hier"],
    ["Fon finans bay pou debloke", "Fonds remis par la finance pour déblocage"], ["Fon finans bay (konfime)", "Fonds remis par la finance (confirmés)"],
    ["Fon finans bay :", "Fonds remis par la finance :"], ["Fon finans bay", "Fonds remis par la finance"],
    ["poko konfime pa ajan an", "pas encore confirmés par l'agent"], ["poko konfime", "pas encore confirmés"],
    ["Ajan an konfime l resevwa l", "L'agent a confirmé la réception"], ["Manager a poko antre anyen", "Le manager n'a encore rien saisi"],
    ["Chwazi yon ajan pou antre kòb finans ba li.", "Choisissez un agent pour saisir les fonds remis."],
    ["Ap tann ajan an", "En attente de l'agent"], ["Konfime", "Confirmé"], ["Ajan an di l pa bon", "Contesté par l'agent"],
    ["Mwen resevwa l", "J'ai reçu"], ["Montan an pa bon", "Montant incorrect"], ["Antre fon pou", "Saisir les fonds pour"], ["Nòt (opsyonèl)", "Note (facultative)"],
    ["Ou konfime ou resevwa", "Confirmez-vous avoir reçu"], ["nan men finans?", "de la finance ?"], ["Finans bay", "La finance remet à"],
    ["Konbyen ou resevwa vrèman? Ekri yon ti mesaj pou manager a.", "Combien avez-vous réellement reçu ? Écrivez un message au manager."],
    ["Ou di montan an pa bon", "Montant contesté"], ["Fon konfime", "Fonds confirmés"], ["Fon korije", "Fonds corrigés"], ["Fon anile", "Fonds annulés"],
    ["Anile fon", "Annuler les fonds"], ["Nouvo montan pou", "Nouveau montant pour"], ["Fon", "Fonds"],
    ["Frè touche :", "Frais encaissés :"], ["Frè touche", "Frais encaissés"], ["Penalite touche :", "Pénalités encaissées :"], ["Penalite touche", "Pénalités encaissées"],
    ["Kapital remèt (kach)", "Capital remboursé (espèces)"], ["Kapital remèt :", "Capital remboursé :"], ["Kapital remèt", "Capital remboursé"],
    ["Kòb debloke bay kliyan", "Argent débloqué aux clients"], ["Kòb debloke (kach)", "Argent débloqué (espèces)"], ["Kòb debloke :", "Argent débloqué :"], ["Kòb debloke", "Argent débloqué"],
    ["Frè (kach)", "Frais (espèces)"], ["Penalite (kach)", "Pénalités (espèces)"],
    ["Kòb pou depoze nan kès ·", "Montant à déposer en caisse ·"], ["Pou depoze nan kès :", "À déposer en caisse :"],
    ["Atansyon :", "Attention :"], ["ajan an debloke plis kòb pase sa li te genyen. Verifye fon finans lan.", "l'agent a débloqué plus d'argent qu'il n'en avait. Vérifiez les fonds remis."],
    ["fon finans pa konte paske ajan an poko konfime l.", "de fonds non comptés car l'agent ne les a pas encore confirmés."],
    ["te pase pa MonCash / NatCash / bank : yo pa nan kès la.", "passés par MonCash / NatCash / banque : pas dans la caisse."],
    ["pa MonCash/lòt", "par MonCash/autre"], ["Rapò Debloke ·", "Rapport Debloke ·"], ["Rapò a kopye", "Rapport copié"], ["Ajan :", "Agent :"],
    ["Mete montan an.", "Entrez le montant."],
    // Mo jeneral
    ["Kote m ye", "Ma position"], ["Egz. maladi, mache fèmen…", "Ex. : maladie, marché fermé…"], ["Egz. malad, konje…", "Ex. : malade, congé…"],
    ["Non, kòd kliyan, nimewo kont oswa telefòn…", "Nom, code client, numéro de compte ou téléphone…"], ["Filtre pa ajan", "Filtrer par agent"],
    ["Fon deyò", "Fonds en cours"], ["fon deyò", "fonds en cours"],
    ["Fritay / vente de rue", "Fritay / vente de rue"], ["Kòd", "Code"], ["Jou", "Jour"], ["jou", "jours"], ["sou", "sur"], ["vizit", "visites"],
    ["moun", "personnes"], ["frè", "frais"], ["kliyan", "clients"], ["Frè", "Frais"], ["operasyon", "opérations"], ["Dat", "Date"], ["Nòt", "Note"]
  ];
  var map = new Map(), keys = [];
  FR.forEach(function (p) { if (!map.has(p[0])) { map.set(p[0], p[1]); keys.push(p[0]); } });
  keys.sort(function (a, b) { return b.length - a.length; });
  var esc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };
  var rx = new RegExp("(?<![\\p{L}\\p{N}'])(" + keys.map(esc).join("|") + ")(?![\\p{L}\\p{N}])", "gu");
  function tr(t) {
    if (!t || typeof t !== "string" || !/[A-Za-zÀ-ÿ]/.test(t)) return t;
    if (map.has(t.trim())) return t.replace(t.trim(), map.get(t.trim()));
    RX.forEach(function (r) { t = t.replace(r[0], r[1]); });
    return t.replace(rx, function (m) { return map.has(m) ? map.get(m) : m; });
  }
  window.tr = tr;
  // Tèks kout pou kote ki pa gen plas (meni anba a, bouton tab yo)
  var CTX = [
    ["nav", { "Jodi a": "Accueil", "Tranzaksyon": "Transac.", "Tranz.": "Trans.", "Rapò": "Rapport", "Senk": "Synchro" }],
    [".seg", { "Remèt": "Rembours.", "Debloke": "Déblocage", "Penalite": "Pénalité" }]
  ];
  function trText(n) {
    var p = n.parentElement, v = n.nodeValue, k = v.trim();
    if (p && p.closest) for (var i = 0; i < CTX.length; i++) if (CTX[i][1][k] && p.closest(CTX[i][0])) return v.replace(k, CTX[i][1][k]);
    return tr(v);
  }

  var ATTR = ["placeholder", "title", "aria-label", "alt"];
  function trEl(el) {
    for (var i = 0; i < ATTR.length; i++) {
      var a = ATTR[i]; if (el.hasAttribute && el.hasAttribute(a)) { var v = el.getAttribute(a), t = tr(v); if (t !== v) el.setAttribute(a, t); }
    }
  }
  function trNode(n) {
    if (n.nodeType === 3) {
      var p = n.parentNode; if (p && (p.nodeName === "SCRIPT" || p.nodeName === "STYLE" || (p.closest && p.closest("[data-notr]")))) return;
      var v = n.nodeValue, t = trText(n); if (t !== v) n.nodeValue = t; return;
    }
    if (n.nodeType !== 1 || n.nodeName === "SCRIPT" || n.nodeName === "STYLE" || n.hasAttribute("data-notr")) return;
    trEl(n);
    var w = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT), x;
    while ((x = w.nextNode())) {
      if (x.nodeType === 1) { if (x.nodeName === "SCRIPT" || x.nodeName === "STYLE") continue; trEl(x); }
      else trNode(x);
    }
  }
  var obs = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      if (m.type === "characterData") trNode(m.target);
      else if (m.type === "attributes") trEl(m.target);
      else m.addedNodes.forEach(trNode);
    });
    obs.takeRecords();     // pa retradui sa nou fèk chanje
  });
  function start() {
    document.title = tr(document.title);
    trNode(document.body);
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTR });
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
  var c = window.confirm.bind(window), pr = window.prompt.bind(window), al = window.alert.bind(window);
  window.confirm = function (m) { return c(tr(m)); };
  window.prompt = function (m, d) { return pr(tr(m), d); };
  window.alert = function (m) { return al(tr(m)); };
})();
