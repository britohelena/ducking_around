registerPattern({
  id: "gato-preto-natal",
  title: "Gato preto de Natal",
  blurb: "Gato preto com gorro de Pai Natal e cachecol vermelho, com bigodes em pesponto.",
  storageKey: "gato-done-natal",
  fabric: "#CFCDC4",
  fabricLabel: "Aida 14 ct (ou 28 ct por 2 fios)",
  special: "Pesponto: 4 linhas de bigodes (BLANC, 1 fio)",
  // Pesponto: [x1, y1, x2, y2, chave do fio]; meios-pontos permitidos
  back: [[2,12,4,12.5,"W"],[3,13,4,12.5,"W"],[7,12,5,12.5,"W"],[5,12.5,7,13,"W"]],
  backInfo: {"dmc":"BLANC","name":"Pesponto (bigodes), 1 fio"},
  // Uma string por linha (de cima para baixo). "." = sem ponto (tecido livre).
  grid: [
    ".....RRRRR................",
    "....RRRR.RR...........KK..",
    "...RRRRR..R..........KKK..",
    "..RRRRRR..WW.........KK...",
    "..RRRRRR..WW........KK....",
    ".RRRRRRRR...........KK....",
    ".KRRRRRRK...........KKK...",
    "WKKWWWWKKW...........KK...",
    "WWWWWWWWWW...........KK...",
    ".KKKKKKKK............KK...",
    ".KOKKKOKK.............KK..",
    ".KKKKKKKK....KKKKKK...KK..",
    ".KKKOKKKK..KKKKKKKKK.KKK..",
    "..KKKKKK..KKKRRRWWKKKKK...",
    "...RRRRRRKKRRRRRWWKKKKK...",
    "...KKKKRRRRRRKKKKKKKKKK...",
    "...KKKKRRRRKKKKKKKKKKKK...",
    "...KKKKKRKKKKKKKKKKKKKKK..",
    "...KKKKKRRKKKKKKKKKKKKKK..",
    "...KKKKKRRRRRWWKKKKKKKKK..",
    "....KKKKKRRRRWWKKKKKKKKK..",
    "....KKKKKKKKKKKKKKKKKKKK..",
    "....KKKKKKKKK...KKKKKKKK..",
    "....KKKK.KKK....KKKKKKKKK.",
    "....KKK..KKK....KKKK.KKKKK",
    "...KKK...KKK.....KKK...KKK",
    "...KK....KK......KKK....KK",
    "..KK.....KK......KK.....KK",
    ".KKK.....KK.....KKK.....KK",
    ".........KK....KKK......KK",
    "........KK.............KK."
  ],
  floss: {
    "K": { dmc: "310", name: "Preto", hex: "#000000", sym: "■" },
    "R": { dmc: "666", name: "Vermelho vivo", hex: "#E31D42", sym: "●" },
    "W": { dmc: "BLANC", name: "Branco", hex: "#FFFFFF", sym: "○" },
    "O": { dmc: "3341", name: "Alperce (olhos e nariz)", hex: "#FC906D", sym: "◆" }
  },
  howto: [
    "Linho/evenweave 28 ct bordado por 2 fios (equivale a Aida 14 ct), margem de uns 8 pontos; 2 fios de mouliné nos pontos cruz.",
    "Borda primeiro o gorro e o cachecol (vermelho), depois o corpo a preto e os três pontos de alperce.",
    "Os bigodes (pesponto BLANC, 1 fio) fazem-se no fim, por cima do preto.",
    "Cabe numa única folha A4 impressa, com símbolos e coordenadas a cada 10 pontos."
  ],
  notes: [
    [
      "Fonte",
      "Bordado real de um gato preto com gorro de Pai Natal e cachecol. A fotografia foi corrigida ponto a ponto: cada ponto cruz cobre 2 × 2 fios do tecido (provavelmente linho/evenweave de 28 ct bordado por 2 fios), por isso cada quadrado da grelha é um ponto cruz. Só se mostra o desenho: o aro de madeira e o fundo ficaram de fora."
    ],
    [
      "Preto 310",
      "Corpo, cauda, patas e a cara do gato. O pelo parece preto puro no bordado, por isso não usei cinzentos."
    ],
    [
      "Vermelho 666",
      "Gorro e cachecol. O vermelho da fotografia é um vermelho puro e vivo; 666 é o vermelho de Natal padrão. 321 é uma alternativa mais escura e 606 mais alaranjada."
    ],
    [
      "Branco BLANC",
      "Pompom, debruado do gorro e as duas pontas brancas do cachecol. Parece cinzento claro na fotografia apenas por causa das sombras entre os pontos."
    ],
    [
      "Olhos e nariz 3341",
      "Três pontos pequenos de laranja-salmão (alperce): um por olho e um no nariz. 3340 (mais intenso) e 351 (coral) são alternativas."
    ],
    [
      "Pesponto (bigodes)",
      "Os bigodes são 4 linhas brancas de pesponto sobre o preto, com 1 fio de BLANC. Estão no gráfico como linhas finas e não como quadrados; os extremos ficam em meios-pontos (entre fios), por isso usa os furos do tecido de 2 em 2 fios. Borda-os no fim."
    ],
    [
      "Tecido",
      "O bordado original está em tecido cinzento-claro. No ecrã, a pré-visualização usa um cinzento semelhante; no gráfico impresso o fundo fica branco."
    ],
    [
      "Cores aproximadas",
      "Os tons hex da DMC são aproximações de ecrã: confirma nos novelos."
    ]
  ]
});
