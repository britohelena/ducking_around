registerPattern({
  id: "cao-de-natal",
  title: "Cão de Natal com hastes de rena",
  blurb: "Labrador preto de olhos âmbar, hastes de rena e coleira azul.",
  storageKey: "dog-done-hound",
  // Uma string por linha (de cima para baixo). "." = sem ponto (tecido livre).
  grid: [
    ".KK.............................KK.",
    "KUUK..KK...................KK..KUUK",
    "KUUK.KUUK.................KUUK.KUUK",
    "KUUK.KUUK..KK.........KK..KUUK.KUUK",
    "KUUK.KUUK.KUUK.......KUUK.KUUK.KUUK",
    "KUUKKKUUKKKUUK.......KUUKKKUUKKKUUK",
    "KUUUUUUUUUUUUUK.....KUUUUUUUUUUUUUK",
    "KUUUUUUUUUUUUUK.....KUUUUUUUUUUUUUK",
    "KTTTTTTTTTTTTTK.....KTTTTTTTTTTTTTK",
    "KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK",
    ".....KRRRRRRRRRRRRRRRRRRRRRRRK.....",
    "....KRRRRRRRRRRRRRRRRRRRRRRRRRK....",
    "....KKKKKKKKKKKKKKKKKKKKKKKKKKK....",
    "....KFFFKFFFFFFFFFFFFFFFFFKFFFK....",
    "...KFFFFKFFFSSFFFDFFFSSFFFKFFFFK...",
    "..KFFFFFKFDDSSDFFDFFDSSDDFKFFFFFK..",
    ".KFFFFFFKFFFFFFFFDFFFFFFFFKFFFFFFK.",
    "KFDDDDDFKFFKKKFFFDFFFKKKFFKFDDDDDFK",
    "KFDSDDDFKFKEWEKFFDFFKEWEKFKFDDDSDFK",
    "KFDSDDDFKFKEEEKFFDFFKEEEKFKFDDDSDFK",
    "KFDSDDDFKFFKKKFFSSSFFKKKFFKFDDDSDFK",
    "KFDSDDDFKFFFFFFSFSFSFFFFFFKFDDDSDFK",
    "KFDDDDDFKDDFFFSCSSSCSFFFDDKFDDDDDFK",
    "KFDDDDDFKDDFFSCKKKKKCSFFDDKFDDDDDFK",
    "KFDDDDDFKDDFSCSKKSKKSCSFDDKFDDDDDFK",
    "KFDDDDDFKDDFSSCSKKKSCSSFDDKFDDDDDFK",
    "KFDDDDDFKDDFSCSSCKCSSCSFDDKFDDDDDFK",
    "KFDDDDDFKDDFSCSKKKKKSCSFDDKFDDDDDFK",
    ".KFFFFFFKKFFSSCSCSCSCSSFFKKFFFFFFK.",
    "..KFFFFFKKKFFSFSCSCSFSFFKKKFFFFFK..",
    "...KKKKKKKKKKKKKKKKKKKKKKKKKKKKK...",
    "......KGGGGGGGGKYYYKGGGGGGGGK......",
    "......KNNNNNNNNKYYYKNNNNNNNNK......",
    "......KGGGGGGGGKYKYKGGGGGGGGK......",
    "......KKKKKKKKKKKKKKKKKKKKKKK......",
    "....KFFFFFFFFFFFFFFFFFFFFFFFFFK....",
    "...KFFFFFFFFSSFFFFFFFSSFFFFFFFFK...",
    "..KFFFFFFFFFFFFFFFFFFFFFFFFFFFFFK..",
    ".KFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFK.",
    ".KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK."
  ],
  floss: {
    "R": { dmc: "666", name: "Vermelho vivo", hex: "#E31D42", sym: "★" },
    "G": { dmc: "797", name: "Azul royal (azul FC Porto)", hex: "#13477D", sym: "◼" },
    "N": { dmc: "798", name: "Azul Delft claro", hex: "#46729F", sym: "✿" },
    "K": { dmc: "310", name: "Preto", hex: "#000000", sym: "■" },
    "D": { dmc: "3799", name: "Cinzento-pewter muito escuro", hex: "#424242", sym: "◆" },
    "F": { dmc: "413", name: "Cinzento-pewter escuro", hex: "#565656", sym: "▲" },
    "S": { dmc: "414", name: "Cinzento-aço escuro", hex: "#8C8C8C", sym: "○" },
    "C": { dmc: "415", name: "Cinzento pérola", hex: "#D3D3D6", sym: "◇" },
    "E": { dmc: "977", name: "Castanho dourado claro", hex: "#DC9C56", sym: "●" },
    "W": { dmc: "BLANC", name: "Branco", hex: "#FFFFFF", sym: "✚" },
    "T": { dmc: "433", name: "Castanho médio", hex: "#7A4E2D", sym: "▼" },
    "U": { dmc: "435", name: "Castanho muito claro", hex: "#B87748", sym: "▽" },
    "Y": { dmc: "725", name: "Amarelo topázio", hex: "#FFC840", sym: "♦" }
  },
  notes: [
    [
      "Preto 310",
      "Contorno de todo o desenho, olhos e nariz. Dá o aspeto limpo e “pixel” do modelo de referência (o beagle)."
    ],
    [
      "Pelo: 3799 / 413",
      "O pelo do cão preto é cinzento-pewter muito escuro (3799) e escuro (413), em vez de preto, para que se veja o brilho do pelo e a separação entre orelhas e cara. O 310 só entra nos contornos."
    ],
    [
      "Focinho grisalho 414 / 415",
      "O focinho mistura 414 (cinzento-aço) e 415 (cinzento pérola) em pontos intercalados, para sugerir um cão a ficar grisalho no nariz sem ficar branco. 415 é a cor mais clara e deve ficar em poucos pontos."
    ],
    [
      "Olhos 977 · BLANC",
      "Íris âmbar (977) com um ponto de brilho em branco (BLANC). 976 é uma alternativa mais escura se quiseres um olhar mais profundo."
    ],
    [
      "Hastes 435 / 433",
      "435 para o corpo das hastes e 433 para a linha de sombra na base. 436 é uma alternativa ligeiramente mais clara."
    ],
    [
      "Fita 666",
      "Vermelho vivo de Natal. 321 é o vermelho mais profundo se preferires um tom mais sóbrio."
    ],
    [
      "Coleira azul 797 / 798",
      "Azul para lembrar o FC Porto: 797 (azul royal) como cor principal e 798 (azul Delft) na risca do meio. O azul oficial do clube é ainda mais escuro e saturado, por isso 796 é a alternativa mais próxima se quiseres mais intensidade."
    ],
    [
      "Guizo 725",
      "Amarelo topázio, com um ponto de 310 no badalo."
    ],
    [
      "Limites da fonte",
      "Não existe um bordado acabado deste cão: o padrão é uma interpretação estilizada da fotografia (um labrador preto de olhos âmbar e focinho grisalho), no estilo do modelo de referência. O desenho é simétrico (espelhado pela coluna central)."
    ]
  ]
});
