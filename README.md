<div align="center">

# DS 220 Group Project

<h2>Online PowerSales Reps</h2>

</div>

- [DS 220 Group Project](#ds-220-group-project)
  - [Entities](#entities)
  - [Relationships](#relationships)
  - [Entity Tables](#entity-tables)
  - [ER Diagram](#er-diagram)

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

## ER Diagram

```mermaid
flowchart BT
    S[SalesRepresentative]
    I[Invoice]
    C[Customer]
    D[DetailLine]
    P[Product]
    V[Vendor]

    S_Identifier((Identifier)) --> S
    S_FirstName((FirstName)) --> S
    S_LastName((LastName)) --> S

    I_Identifier((Identifier)) --> I

    C_Identifier((Identifier)) --> C
    C_FirstName((FirstName)) --> C
    C_LastName((LastName)) --> C

    D_Identifier((Identifier)) --> D

    P_Identifier((Identifier)) --> P
    P_Name((Name)) --> P

    V_Identifier((Identifier)) --> V
    V_Name((Name)) --> V

    I --- WrittenBy{WrittenBy}
    WrittenBy --- S

    IssuedTo{IssuedTo} --- C
    I --- IssuedTo

    D --- WrittenIn{WrittenIn}
    WrittenIn --- I

    D --- Itemizes{Itemizes}
    Itemizes --- P

    P --- ProducedBy{ProducedBy}
    ProducedBy --- V
```
