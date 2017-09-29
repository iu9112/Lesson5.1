'use strict';

class Pokemon {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
    show() {
        console.log(`Hi! My name is ${this.name}, my level is ${this.level}`);
    }
    valueOf(){
        return this.level;
    }
}


class Pokemonlist extends Array{
    constructor(...items){
        items = items.filter(
            item => item instanceof Pokemon
        );
        super(...items);
    }
    add(name,level){
        let newPokemon = new Pokemon(name,level);
        this.push(newPokemon);
    }
    show(){
        this.forEach(function(item){
            item.show();
        });
        console.log(`There are ${this.length} pokemons here.`);
    }
    max(){
        let strongestPokemon = Math.max(...this);
        return this.find(
        item => item.level==strongestPokemon
        );
    }
}

const sinon  = require('sinon');
const assert = require('assert');
const expect = require('chai').expect;
describe('Тестирование Pokemon метод show()', () => {
    
    it('Должен выввести имя pikachu и уровень 33', function() {
        
        let spy = sinon.spy(console, 'log');
        
        const pokemon = new Pokemon('pikachu', 33);
        pokemon.show();
        
        assert(spy.calledOnce);
        assert(spy.calledWith('Hi! My name is pikachu, my level is 33'));
        spy.restore();
    });
    
});

describe('Тестирование Pokemonlist', () => {
    let pokemons;
    before(() => {
        pokemons = new Pokemonlist();
        pokemons.add('Bulbasaur', 33);
        pokemons.add('Ivysaur', 22);
    });
    
    it('Должен вывести список покемонов show()', function() {
        
        let spy = sinon.spy(console, 'log');
        
        pokemons.show();
        assert(spy.calledThrice);
        assert(spy.calledWith('Hi! My name is Bulbasaur, my level is 33'));
        assert(spy.calledWith('Hi! My name is Ivysaur, my level is 22'));
        assert(spy.calledWith('There are 2 pokemons here.'));
        spy.restore();
    });
    
    it('Должен добавить покемона', function() {
           
        pokemons.add('Pikachu', 77);
        let last = pokemons.length-1;
        expect(pokemons[last]).eql({ name: 'Pikachu', level: 77 });
        
    });
    
    it('Должен показать пикачу', function() {
    
        expect(pokemons.max()).eql({ name: 'Pikachu', level: 77 });
        
    });
});