-- Active: 1711882280674@@127.0.0.1@3306@test
SELECT
    Customer_id,
    GROUP_CONCAT(DISTINCT Product_name ORDER BY Product_name) as products,
    CASE
        WHEN COUNT(DISTINCT(EXTRACT(YEAR_MONTH FROM Order_date))) > 1 THEN CONCAT(COUNT(DISTINCT(EXTRACT(YEAR_MONTH FROM Order_date))), ' months purchases')
        ELSE CONCAT(COUNT(DISTINCT(EXTRACT(YEAR_MONTH FROM Order_date))), ' month purchases')
    END AS Total_months
FROM orders_cust 
GROUP BY Customer_id;


SELECT 
    Customer_id,
    GROUP_CONCAT(DISTINCT Product_name ORDER BY Product_name) AS products,
    CASE
        WHEN COUNT(DISTINCT DATE_FORMAT(order_date, '%Y-%m')) > 1 THEN CONCAT(COUNT(DISTINCT DATE_FORMAT(order_date, '%Y-%m')), ' months purchases')
        ELSE CONCAT(COUNT(DISTINCT DATE_FORMAT(order_date, '%Y-%m')), ' month purchases')
    END AS Total_months
FROM 
    orders_cust
GROUP BY 
    Customer_id;


SELECT 
    Customer_id,
    GROUP_CONCAT(DISTINCT Product_name ORDER BY Product_name) AS products,
    CONCAT(
        COUNT(DISTINCT DATE_FORMAT(order_date, '%Y-%m')),
        CASE
            WHEN COUNT(DISTINCT DATE_FORMAT(order_date, '%Y-%m')) > 1 THEN ' months purchases'
            ELSE ' month purchases'
        END
    ) AS Total_months
FROM 
    orders_cust
GROUP BY 
    Customer_id;

SELECT 
    o.Customer_id,
    subquery.products,
    CONCAT(
        subquery.distinct_months,
        CASE
            WHEN subquery.distinct_months > 1 THEN ' months purchases'
            ELSE ' month purchases'
        END
    ) AS Total_months
FROM (
    SELECT 
        Customer_id,
        GROUP_CONCAT(DISTINCT Product_name ORDER BY Product_name SEPARATOR ', ') AS products,
        COUNT(DISTINCT DATE_FORMAT(order_date, '%Y-%m')) AS distinct_months
    FROM 
        orders_cust
    GROUP BY 
        Customer_id
) AS subquery
JOIN orders_cust AS o ON o.Customer_id = subquery.Customer_id
GROUP BY 
    o.Customer_id;

SELECT `Product_name` FROM orders_cust GROUP BY `Product_name`












select test.Customer_id, test2.products, test.Total_months from 
(
    SELECT
        Customer_id,
        IF (
            COUNT(Customer_id) > 1, 
            CONCAT(COUNT(Customer_id), ' months purchases'), 
            CONCAT(COUNT(Customer_id), ' month purchases')
        ) as Total_months
    FROM (
        SELECT
            Customer_id,
            Order_date
        FROM (
            SELECT 
                Orderid,
                EXTRACT(YEAR_MONTH FROM Order_date) AS Order_date, 
                Customer_id 
            FROM orders_cust
        ) AS orders
        GROUP BY Customer_id, Order_date
    ) as test3 GROUP BY Customer_id
) as test
LEFT JOIN (
    SELECT 
        Customer_id, GROUP_CONCAT(DISTINCT(Product_name)) as products FROM orders_cust GROUP BY Customer_id
) as test2 ON test.Customer_id = test2.Customer_id;



SELECT
    Cutomer_id,
    GROUP_CONCAT(DISTINCT Product_name) as products,
    IF (
        COUNT(DISTINCT EXTRACT(YEAR_MONTH FROM Order_date)) > 1,
        CONCAT(COUNT(DISTINCT EXTRACT(YEAR_MONTH FROM Order_date)), ' months purchases'),
        CONCAT(COUNT(DISTINCT EXTRACT(YEAR_MONTH FROM Order_date)), ' month purchases')
    ) as Total_months
FROM
    orders_cust
GROUP BY
    Cutomer_id,
    EXTRACT(YEAR_MONTH FROM Order_date);


-- #1140 - In aggregated query without GROUP BY, expression #1 of SELECT list contains nonaggregated column ''; this is incompatible with sql_mode=only_full_group_by