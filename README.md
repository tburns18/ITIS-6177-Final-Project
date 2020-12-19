# ITIS 6177 Final Project - Language Understanding Intelligent Services 
### Tyler Burns

This is an implementation of the Microsoft Azure Language Understanding Intelligent Services (LUIS) API: (https://azure.microsoft.com/en-us/services/cognitive-services/language-understanding-intelligent-service/)

## Language Understanding
Utilize the subset of language understanding and analysis to find the intent of a phrase in context of ordering. In this scenario the setting is
a pizza restaurant.

**"Sample Language Understanding Phrase - Order**
```
["I would like to order a large 3 topping pizza with extra cheese, light pepperoni and mushrooms."]
```

**"Output in JSON format"**
```
Returns output analysis report of posted string with accompanying metadata for further processing and use in application. This may be used as a chat engine
for a bot or automated customer service representative. In this context an automated pizza order application could accept this output to complete a customer order.

