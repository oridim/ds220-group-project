<div align="center">

# DS 220 Group Project

<h2>Online PowerSales Reps</h2>

</div>

- [DS 220 Group Project](#ds-220-group-project)
  - [Entities](#entities)
  - [Relationships](#relationships)
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

## Entity Tables

```mermaid
classDiagram
    class SalesRepresentative {
        • Identifier __R__ __U__
        FirstName __R__
        LastName __R__
    }

    class Customer {
        • Identifier __R__ __U__
        FirstName __R__
        LastName __R__
    }

    class Invoice {
        • Identifier __R__ __U__
        WrittenBy __R__
        IssuedTo __R__
    }

    class DetailLine {
        • Identifier __R__ __U__
        WrittenIn __R__
        Itemizes __R__
    }

    class Product {
        • Identifier __R__ __U__
        Name __R__
        ProducedBy __R__
    }

    class Vendor {
        • Identifier __R__ __U__
        Name __R__
    }

    Invoice -->  "WrittenBy" SalesRepresentative
    Invoice "IssuedTo" --> Customer
    DetailLine --> "WrittenIn" Invoice
    DetailLine "Itemizes" --> Product
    Product -->  "ProducedBy" Vendor
```

