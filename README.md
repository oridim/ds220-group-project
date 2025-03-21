<div align="center">

# DS 220 Group Project

<h2>Online PowerSales Reps</h2>

</div>

- [DS 220 Group Project](#ds-220-group-project)
  - [Entities](#entities)
  - [Relationships](#relationships)
  - [ER Diagram](#er-diagram)
  - [Entity Tables](#entity-tables)

## Entities

| Entity Name           | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `SalesRepresentative` | An employee who works with external clients and their requests.   |
| `Customer`            | A person external to the company who purchased our product(s).    |
| `Invoice`             | A statement list of products and services rendered to a customer. |
| `DetailLine`          | A itemized product of server listed in an invoice.                |
| `Vendor`              | An external partner the company purchases products from.          |
| `Product`             | A product produced by a vendor we are selling.                    |

## Relationships

```mermaid
flowchart TD
    S[SalesRepresentative] --> | Writes | I[Invoice]
    I --> |IssuedTo| C[Customer]
    I --> |HasListed| D[DetailLine]
    V[Vendor] --> |Produces| P[Product]
    D --> |HasItemized| P
```

## ER Diagram

> [!NOTE]
> PlantUML does not support partial key values for weak entities.
> Just imagine the underlines for the `Identifier` attributes for `Invoice`, `DetailLine`, and `Product` are dotted instead of solid.

> [!NOTE]
> PlantUML has auto-layout for Peter Chen notation. Sorry for how "wide" the diagram is.

![ER Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/oridim/ds220-group-project/refs/heads/main/ERDiagram.puml)

## Entity Tables

```mermaid
erDiagram
    SalesRepresentative {
        *Identifier int
        FirstName string "R"
        LastName string "R"
    }

    Customer {
        *Identifier int
        FirstName string "R"
        LastName string "R"
    }

    Invoice {
        *Identifier int
        FirstName string "R"
        LastName string "R"
    }

    DetailLine {
        *Identifier int
        WrittenIn int "FK,R"
        Itemizes int "FK,R"
    }

    Product {
        *Identifier int
        Name string "R"
        ProducedBy int "FK,R"
    }

    Vendor {
        *Identifier int
        Name string "R"
    }

    Invoice }o--|| SalesRepresentative: WrittenBy
    Invoice }o--|| Customer: IssuedTo
    DetailLine }o--|| Invoice: WrittenIn
    DetailLine ||--|| Product: Itemizes
    Product }o--|| Vendor: Produces
```