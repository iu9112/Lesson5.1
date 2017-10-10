'use strict';

const Pokemon = require('../pokemon.js').Pokemon;
const Pokemonlist = require('../pokemon.js').Pokemonlist;

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
    beforeEach(() => {
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
    
        expect(pokemons.max()).eql({ name: 'Bulbasaur', level: 33 });
        
    });
});