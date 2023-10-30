var pessoas = [];
var papeis = [
{tipo:"Piloto", descricao:"Escreve código conforme direcionamento do navegador",
  cor:"darkmagenta", 
  quests:[
    {texto: "Ignorar uma instrução direta dos Participantes.", niveis:[0,1,2,3]},
	{texto: "Rodar todos os testes depois de uma mudança", niveis:[0,1,2,3]},
	{texto: "Usar novo atalho de teclado ou funcionalidade de ferramenta.", niveis:[0,1,2,3]},
	{texto: "Fazer uma pergunta para esclarecer o que digitar.", niveis:[1,2,3]},
	{texto: "Digitar algo com o qual não concorda.", niveis:[2,3]}
  ]
}, 
{tipo:"Navegador", descricao:"Fornece direcionamento para o time",
  cor:"orange",
   quests:[
    {texto: "Pedir ideias para Participantes sobre o que fazer a seguir.", niveis:[0,1,2,3]},
	{texto: "Filtrar as ideias dos Participantes, dizendo ao Piloto o que digitar.", niveis:[0,1,2,3]},
	{texto: "Descrever um teste falhando desejável ('red' em red-green-refactor).", niveis:[0]},
	{texto: "Manter o time focado no passo atual do red-green-refactor.", niveis:[1,2,3]},
	{texto: "Usar o Readme para expressar a task atual, ideias, alternativas.", niveis:[2]},
	{texto: "Completar um ciclo de Red-Green-Refactor.", niveis:[3]}
  ]}, 
{tipo:"Participante", descricao:"Ajuda o time a superar o desafio",
  cor:"darkgreen", 
   quests:[
    {texto: "Contribuir com uma ideia.", niveis:[0,1,2,3]},
	{texto: "Perguntar até entender.", niveis:[0,1,2,3]},
	{texto: "Ouvir com muita atenção.", niveis:[0]},
	{texto: "Apoiar ideia de Participante de níveis anteriores.", niveis:[1,2,3]},
	{texto: "Identificar uma oportunidade de refatoração.", niveis:[2,3]},
	{texto: "Celebrar um momento de excelência.", niveis:[3]},
	{texto: "Pesquisar a resposta para uma dúvida.", niveis:[3]}
  ]}
  ];
var labelNiveis = ['D', 'C', 'B', 'A'];
var maxXpNiveis = [2, 3, 4, 9999];

function addNome() {

  var nome = document.getElementById("nome");

  if (!nome.value || nome.value.trim().length==0) {
    return;
  }
  
  var divPainel = document.getElementById("painelPessoas");
  var elementoAvo = document.createElement("divPessoa");
  elementoAvo.setAttribute("class", "divPessoa");
  elementoAvo.setAttribute("data-nome", nome.value);

  createPessoaHeader(elementoAvo, nome);
  
  var labelDescricao = createLabel("lbDescricao");
  elementoAvo.appendChild(labelDescricao);
  
  var txtQuests = document.createElement("div");
  txtQuests.setAttribute("name", "txtQuests");
  txtQuests.setAttribute("class", "txtQuests");
  elementoAvo.appendChild(txtQuests);
  
  createScoring(elementoAvo);
  divPainel.appendChild(elementoAvo, nome.value);
  
  pessoas.push({nome: nome.value.trim(), ativo: true, niveis: getNiveisZero()});
  nome.value = "";
  
  setRoles();
  nome.focus();
}

function createScoring(elementoAvo, nome) {
	
  var elementoPai = document.createElement("div");
  elementoPai.setAttribute("class", "divScoring");
	
  var lbXP = createLabel("lbXP");
  elementoPai.appendChild(lbXP);
  
  var campoXP = document.createElement("input");
  campoXP.setAttribute("type", "number");
  campoXP.setAttribute("min", 0);
  campoXP.setAttribute("max", 5);
  campoXP.setAttribute("value", 0);
  campoXP.setAttribute("maxlength", 1);
  campoXP.setAttribute("name", "campoXP");
  campoXP.setAttribute("class", "campoXP");
  elementoPai.appendChild(campoXP);
  
  var btnConfirm =  document.createElement("input");
  btnConfirm.setAttribute("type", "button");
  btnConfirm.setAttribute("class", "btnName");
  btnConfirm.setAttribute("value", "+");
  btnConfirm.onclick = function() {
	  var i = pessoas.findIndex(p => p.nome == elementoAvo.getAttribute("data-nome"));
	  somarXp(pessoas[i], Number(campoXP.value), i);	 
	  campoXP.value = null;
  };
  elementoPai.appendChild(btnConfirm);
  
  elementoAvo.appendChild(elementoPai);
}

function createPessoaHeader(elementoAvo, nome) {
  var elementoPai = document.createElement("div");
  elementoPai.setAttribute("class", "divPessoaHeader");
  
  var labelNome = createLabel("lbName");
  labelNome.innerText = nome.value;
  elementoPai.appendChild(labelNome);

  var labelRole = createLabel("lbRole");
  elementoPai.appendChild(labelRole);
  
  var btnDelete = document.createElement("input");
  btnDelete.setAttribute("type", "button");
  btnDelete.setAttribute("class", "btnName");
  btnDelete.setAttribute("value", "-");
  btnDelete.onclick = function() {
	var painelPessoas = document.getElementById("painelPessoas");
	painelPessoas.removeChild(elementoAvo);
	
	var i = pessoas.findIndex(p => p.nome == elementoAvo.getAttribute("data-nome"));
	pessoas.splice(i, 1);
	setRoles();
	nome.focus();
  }
  elementoPai.appendChild(btnDelete);
  elementoAvo.appendChild(elementoPai);
}

function createLabel(nome) {
	var label = document.createElement("label");
	label.setAttribute("name", nome);
    label.setAttribute("class", nome);
	return label;
}

function somarXp(pessoa, valor, i) {
	if (!valor) {
		return;
	}
	papel = pessoa.papelAtual;
	var nivel = pessoa.niveis[papel.tipo];
	var xpAtual = nivel.xp;
	var maxXpNivel = maxXpNiveis[nivel.nivel];

	if (xpAtual + valor < maxXpNivel) {
		nivel.xp = nivel.xp + valor;
	} else {
		nivel.nivel++;
		nivel.xp=0;
	}
	setPapel(pessoa, i, pessoa.papelAtual);
}

function getNiveisZero() {
	var niveis = {};
	papeis.forEach(p => niveis[p.tipo] = {nivel: 0, xp:0});
	return niveis;
}

function setRoles() {

	for (i=0; i<pessoas.length; i++) {
		var papel = (i<2) ? papeis[i] : papeis[2];
		setPapel(pessoas[i], i, papel);
	};
}

function rotate() {
	if (pessoas.length ==0) {
		return;
	}

	var primeiro = pessoas[0].papelAtual;
	for (i=0; i < pessoas.length; i++) {
		var papel = (i+1 < pessoas.length) ? pessoas[i+1].papelAtual : primeiro;
		setPapel(pessoas[i], i, papel);
	};
}

function setPapel(pessoa, i, papel) {
	var lbRole = document.getElementsByName("lbRole")[i];
	var lbDescricao = document.getElementsByName("lbDescricao")[i];
	var txtQuest = document.getElementsByName("txtQuests")[i];
	var lbXP = document.getElementsByName("lbXP")[i];
	
	pessoa.papelAtual = papel;
	
	var nivel = pessoa.niveis[papel.tipo];
	var textoNivel ="Nível " + labelNiveis[nivel.nivel];
	
	lbRole.innerText = papel.tipo + " - " + textoNivel;
	lbRole.setAttribute("style", "color:" + papel.cor);
	lbXP.setAttribute("style", "color:" + papel.cor);

	lbDescricao.innerText = papel.descricao;
	setQuests(txtQuest, papel, nivel.nivel);
		
	var maxXpNivel = maxXpNiveis[nivel.nivel];
	var textoXp = "XP " + nivel.xp;
	if (maxXpNivel < 9999) {
		textoXp = textoXp + " / " + maxXpNivel;
	}
	lbXP.innerText = textoXp; 
	
}

function setQuests(txtQuest, papel, nivel) {
	var quests = papel.quests.filter(q => q.niveis.includes(nivel));
	txtQuest.innerHTML = quests.flatMap(q => "- " + q.texto).join("<br>");
}

function start() {
}