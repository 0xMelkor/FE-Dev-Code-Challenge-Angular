# Advanced Notes
This project has been developed with Domain Driven Design (DDD) principles in mind. This lead to an architectural structure with proven separation of concerns and high scalability and maintanability capabilities. 

![image info](./docs/architecture.png)

The project is then structured into 4 different layers:

* **Domain:** It is the main sphere of knowledge or activity we are trying to address with our application. Contains representation of business entities and rules that in geneal are not likely to change (ideally they never change).

* **Application:** It is the layer where Use-Cases belong. It contains the application logic built on top of the  "domain". This layer is likely to change faster.

* **Infrastructure:** It represents the actual "physical" infrastructure supporting our application (Relational DB, Websocket, REST ecc.). It has strong relashionships with dev frameworks (Angular in this case) and with communication means that deal with the "persistence" layer. The "application" layer commucates with the "infrastructure" through abstractions. That effectively creates a sealed boundary between layers.

* **Presentation:**  This layer is intended to expose Use-Cases to the final user. "Presentation" is connected to the "application" via abstractions classes that expose interfaces to correctly support the Use-Case.



