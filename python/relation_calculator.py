'''
Created on Oct 25, 2014

@author: tim
'''

import numpy as np
from scipy.spatial import distance

class Relation_Calculator():
    
    def __init__(self):        
        with open('vectors.txt') as f:
            content = f.readlines()  
            
        vectors = []
        compressed_ingredients = []
        for line in content:
            dictDoc = {}
            data = line.split(' ')
            dictDoc['ingredient_name'] = data[0]    
            compressed_ingredients.append(data[0])
            dictDoc['vector'] = np.float32(data[1:-1]).tolist()    
            vectors.append(dictDoc)
            
        X = []
        self.dictIngredientToIdx = {}
        self.idx_dict = {}
        for i, vector in enumerate(vectors):
            if len(vector['vector']) > 10:
                X.append(vector['vector'])
                self.dictIngredientToIdx[vector['ingredient_name']] = i-1  
                self.idx_dict[i-1] = vector['ingredient_name']
            
        self.X = np.array(X)
        pass    

    def get_keywords(self, searchword, searchtype = 0):
        #searchtype 0 == hashtag
        #searchtype 1 == user
        #searchtype 2 == words
        #searchtype 3 == all
        if searchword not in self.dictIngredientToIdx: return []
        words = []
        cos_dist = []
        
        word_value = self.X[self.dictIngredientToIdx[searchword],:]
            
        for j in range(self.X.shape[0]):
            cos_dist.append(distance.cosine(self.X[j],word_value))
        nearest = np.array(cos_dist).argsort()[0:100] 
        
        for idx in nearest:
            word = self.idx_dict[idx]
            if searchtype == 0:
                if '#' in word:
                    words.append(word)

            elif searchtype == 1:
                if '@' in word:
                    words.append(word)
                    
            elif searchtype == 2:
                if '@' not in word and '#' not in word:
                    words.append(word)
            else:
                words.append(word)
                
        return words



