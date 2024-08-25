# Jokes Generator

## Making jokes generator with filter categories, using external API

![boxing](https://github.com/MichaelB0312/ex_API/blob/master/public/images/joker-laughing.gif)
## By: [Michael Berko](https://github.com/MichaelB0312)



### [Full credit to JokeAPI Documantation Authors](https://v2.jokeapi.dev/) 

## Agenda

* [Background](#background)
* [Dataset](#dataset)
* [Model](#model)
* [Pruning Process](#pruning-process)
* [Parameters](#prerequisites)
* [Running Instructions](#running-instructions)
* [Results](#Results)
* [Prerequisites](#prerequisites)
* [Files in the repository](#files-in-the-repository)
* [References](#references)

## Background
In this project, we will explore how reducing weights in a given model affects the accuracy of the model, in different words exploring the tradeoff between low memory and high accuracy. 
We will gradually remove weights with the lowest L1-norm in a trained model and see the test results. **Our assumption is that the lowest l1-norm weights are the least effective on model classification quality**. Our challenge will be how to decrease amount of weights without hurting the accuracy too much. In the end, we will determine what is the optimal percent of weights that can be removed with keeping high accuracy.
We took the idea for this project from:[Pruning Algorithm to Accelerate Convolutional Neural Networks for Edge Applications](http://arxiv.org/abs/2005.04275), by J. Liu, S. Tripathi, U. Kurup, and M. Shah.
