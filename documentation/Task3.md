# Task 3 - SQL exercise

## The Task

The final part of this technical task will test your ability to write and handle data using SQL.  
Below you will find a visual depiction of a DB schema and the data that can be found within the  
tables.  
\[...\]  
Your task is to write SQL statements to achieve the following results:

1.  Return all orders that have not been executed.
2.  Return all orders and their associated allocations for Portfolios P001 or P003.
3.  Return all orders with executions. Include in the result set, full data and the currency codes.
4.  Return only those orders with multiple allocations.
5.  Rank counterparties in order of number of deals they have executed.

## The Solution

### 1\. Return all orders that have not been executed.

```
SELECT *
FROM "Order"
WHERE NOT EXISTS (
    SELECT 1
    FROM OrderExecution
    WHERE OrderExecution.OrderId = "Order".id
)
```

### 2\. Return all orders and their associated allocations for Portfolios P001 or P003.

```
SELECT "Order".Id "OrderId"
    ,OrderAllocation.Id "OrderAllocationId"
    ,*
FROM "Order"
LEFT JOIN OrderAllocation ON "Order".Id = OrderAllocation.OrderId
WHERE OrderAllocation.PortfolioId IN (
    SELECT Id
    FROM Portfolio
    WHERE Portfolio.PortfolioCode IN ('P001', 'P003')
)
```

### 3\. Return all orders with executions. Include in the result set, full data and the currency codes.

```
SELECT "Order".Id "OrderId"
    ,OrderExecution.Id "OrderExecutionId"
    ,CurrencyPair.BaseCurrencyISO
    ,CurrencyPair.CounterCurrencyISO
    ,*
FROM "Order"
INNER JOIN OrderExecution ON OrderExecution.OrderId = "Order".Id
LEFT OUTER JOIN CurrencyPair ON "Order".CurrencyPairId = CurrencyPair.Id
```

### 4\. Return only those orders with multiple allocations.

```
SELECT "Order".Id "Order.Id"
    ,OrderAllocation.Id "OrderAllocation.Id"
    ,*
FROM "Order"
LEFT JOIN OrderAllocation ON "Order".Id = OrderAllocation.OrderId
WHERE EXISTS (
    SELECT 1
    FROM OrderAllocation OrdAll2
    WHERE OrdAll2.OrderId = OrderAllocation.OrderId
    AND OrdAll2.Id != OrderAllocation.Id
)
```

### 5\. Rank counterparties in order of number of deals they have executed.

```
SELECT CounterPartyName
    ,(
        SELECT count(1)
        FROM OrderExecution
        WHERE OrderExecution.CounterPartyId = CounterParty.Id
    ) "OrderExecutionCount"
FROM CounterParty
ORDER BY 2 DESC
```
