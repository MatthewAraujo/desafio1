import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });

class Vertice{
  constructor(x,y){
    this.x = x; 
    this.y = y;
  }

  getDistancia(x,y){
    return Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2));
  }

  move(x,y){
    this.x = x
    this.y = y
    return this;
  }

  equals(vertice){
    return this.x == vertice.x && this.y == vertice.y;
  }
}


class Triangulo{
  constructor(x,y,z){
    this.x = new Vertice();
    this.y = new Vertice();
    this.z = new Vertice();
  }

  equals(triangulo){
    return this.x.equals(triangulo.x) && this.y.equals(triangulo.y) && this.z.equals(triangulo.z);
  }

  getPerimetro(){
    return this.x.getDistancia(this.y.x,this.y.y) + this.y.getDistancia(this.z.x,this.z.y) + this.z.getDistancia(this.x.x,this.x.y);
  }

  tipo(){
    if(this.x.getDistancia(this.y.x,this.y.y) == this.y.getDistancia(this.z.x,this.z.y) && this.y.getDistancia(this.z.x,this.z.y) == this.z.getDistancia(this.x.x,this.x.y)){
      return "Equilatero";
    }
    else if(this.x.getDistancia(this.y.x,this.y.y) == this.y.getDistancia(this.z.x,this.z.y) || this.y.getDistancia(this.z.x,this.z.y) == this.z.getDistancia(this.x.x,this.x.y) || this.z.getDistancia(this.x.x,this.x.y) == this.x.getDistancia(this.y.x,this.y.y)){
      return "Isosceles";
    }
    else{
      return "Escaleno";
    }
  }

  clone(){
    return new Triangulo(this.x,this.y,this.z);	
  }

  area(){
    let p = this.getPerimetro()/2;
    return Math.sqrt(p*(p-this.x.getDistancia(this.y.x,this.y.y))*(p-this.y.getDistancia(this.z.x,this.z.y))*(p-this.z.getDistancia(this.x.x,this.x.y)));
  }
}


class Poligono{

  constructor(vertice1, vertice2, vertice3, ...outrosVertices) {
    if (!vertice1 || !vertice2 || !vertice3) {
      throw new Error('O polígono deve ter pelo menos 3 vértices.');
    }

    this.vertices = [vertice1, vertice2, vertice3];

    for (const vertice of outrosVertices) {
      this.addVertice(vertice);
    }
  }


  addVertice(vertice){
    if(vertices.includes(vertice)){
      console.log("Vertice ja existe");
      return false;
    }
    this.vertices.push(vertice);
    return true;
  }


  get perimetro() {
    let perimetro = 0;

    for (let i = 0; i < this.vertices.length; i++) {
      const verticeAtual = this.vertices[i];
      const verticeSeguinte = this.vertices[(i + 1) % this.vertices.length];

      const distancia = Math.sqrt(
        Math.pow(verticeSeguinte.x - verticeAtual.x, 2) +
        Math.pow(verticeSeguinte.y - verticeAtual.y, 2)
      );

      perimetro += distancia;
    }

    return perimetro;
  }

  qtdVertices(){
    return this.vertices.length;
  }
}
let opcao = 0

const vertices = [];
const triangulos = []

do {
  console.log("1 - Criar um vertice");
  console.log("2 - Criar um triangulo");
  console.log("3 - Calcular a distancia entre dois vertices");
  console.log("4 - Mover um vertice");
  console.log("5 - Verificar se dois vertices sao iguais");
  console.log("6 - Verificar o perimetro de um triangulo")
  console.log("7 - Verificar o tipo de um triangulo")	
  console.log("8 - Duplicar um triangulo")
  console.log("9 - Adicionar vertice ao poligono")
  console.log("10 - Verificar perimetro do poligono")
  console.log("11 - Verificar quantidade de vertices do poligono")
  console.log("12 - Sair")
  opcao = prompt("Digite a opcao desejada: ");
  switch (opcao) {
    case "1":
      const vertice = new Vertice(prompt("Digite a coordenada x: "),prompt("Digite a coordenada y: "));
      vertices.push(vertice);
      console.log(vertice);
      break;
    case "2":
      const triangulo = new Triangulo
      triangulos.push(triangulo);
      console.log(triangulo);
      break;
    case "3":
      if(vertices.length < 2){
        console.log("Nao ha vertices suficientes");
        break;
      }
      const vertice1 = new Vertice(prompt("Digite a coordenada x: "),prompt("Digite a coordenada y: "));
      console.log(vertices[0].getDistancia(vertice1.x, vertice1.y));
      break;
    case "4":
      if(vertices.length == 0){
        console.log("Nao ha vertices");
        break;
      }
      console.log(vertices[0].move(prompt("Digite a coordenada x: "),prompt("Digite a coordenada y: ")));
      break;
    case "5":
      if(vertices.length == 0){
        console.log("Nao ha vertices");
        break;
      }
      const vertice6 = new Vertice(prompt("Digite a coordenada x: "),prompt("Digite a coordenada y: "));
      console.log(vertices[0].equals(vertice6));
      break;
    case "6":
      if(triangulos.length < 1){
        console.log("Nao ha vertices suficientes");
        break;
      }
      triangulos.getPerimetros()

    case "7":
      if(triangulos.length < 1){
        console.log("Nao ha vertices suficientes");
        break;
      }

      console.log(triangulos[0].tipo());

    case '8':
      if(triangulos.length < 1){
        console.log("Nao ha vertices suficientes");
        break;
      }

      console.log(triangulos[0].clone());

    case '9':
      const poligono = new Poligono(vertices[0],vertices[1],vertices[2]);
      poligono.addVertice(prompt("Digite a coordenada x: "),prompt("Digite a coordenada y: "))
      console.log(poligono);
      break;
    
    case '10':
      const poligono1 = new Poligono(vertices[0],vertices[1],vertices[2]);
      console.log(poligono1.perimetro);
      break;
    
    case '11':
      const poligono2 = new Poligono(vertices[0],vertices[1],vertices[2]);
      console.log(poligono2.qtdVertices());
      break;
    
    case "12":
      console.log("Saindo...");
      break

    default:
      console.log("Opcao invalida");
      break;
}
} while (opcao != "12");
