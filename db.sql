CREATE DATABASE shop;
\c shop

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    disc VARCHAR,
    dt jsonb NOT NULL,
    prise INT NOT NULL
);

INSERT INTO products(title, img, disc, dt, prise)
VALUES
(
    'noutbok',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "oq": {"ram":16,"storage":250},
        "qora": {"ram":16,"storage":250}
    }',
    11213213
),
(
    'kiyim',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "oq": {"size":40,"tavar":"baxmal"},
        "qora": {"size":30,"tavar":"shoyi"}
    }',
    11213213
),
(
    'sochiq',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "oq": {"size":40,"tavar":"yumshoq"},
        "kok": {"size":30,"tavar":"mayin"}
    }',
    11213213
),
(
    'batareya',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "katta": {"volt":20},
        "kichik": {"volt":9}
    }',
    11213213
),
(
    'telefon',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "qora": {"ram":8,"storage":128,"brand":"Samsung"},
        "oq": {"ram":12,"storage":256,"brand":"Apple"}
    }',
    14500000
),
(
    'televizor',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "katta": {"inch":55,"type":"OLED"},
        "kichik": {"inch":43,"type":"LED"}
    }',
    11213213
),
(
    'krossovka',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "oq": {"size":42,"brand":"Nike"},
        "qora": {"size":40,"brand":"Adidas"}
    }',
    11213213
),
(
    'sumka',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "ayollar": {"material":"teri","rang":"qizil"},
        "erkaklar": {"material":"matoli","rang":"qora"}
    }',
    11213213
),
(
    'soat',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "mexanik": {"brand":"Rolex","suvga_chidamli":true},
        "elektron": {"brand":"Casio","suvga_chidamli":false}
    }',
    11213213
),
(
    'velosiped',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "bolalar": {"gildirak":16,"rang":"kok"},
        "katta": {"gildirak":26,"rang":"qizil"}
    }',
    11213213
),
(
    'kitob',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "bosma": {"muallif":"Orwell","nom":"1984"},
        "elektron": {"format":"PDF","til":"inglizcha"}
    }',
    11213213
),
(
    'muzlatgich',
    'img',
    'adsfkasdfsdakjfhkasdjhfkjasdhfkj',
    '{
        "katta": {"hajm":400,"energiya":"A+"},
        "kichik": {"hajm":250,"energiya":"A"}
    }',
    11213213
);
