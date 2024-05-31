--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: autobases; Type: TABLE; Schema: public; Owner: autobase
--

CREATE TABLE public.autobases (
    base_id integer NOT NULL,
    number character varying,
    adress character varying
);


ALTER TABLE public.autobases OWNER TO autobase;

--
-- Name: autobases_base_id_seq; Type: SEQUENCE; Schema: public; Owner: autobase
--

CREATE SEQUENCE public.autobases_base_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.autobases_base_id_seq OWNER TO autobase;

--
-- Name: autobases_base_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autobase
--

ALTER SEQUENCE public.autobases_base_id_seq OWNED BY public.autobases.base_id;


--
-- Name: automobiles; Type: TABLE; Schema: public; Owner: autobase
--

CREATE TABLE public.automobiles (
    auto_id integer NOT NULL,
    auto_firma character varying,
    auto_model character varying,
    auto_type character varying,
    state_number character varying,
    fuel character varying,
    base_id integer NOT NULL
);


ALTER TABLE public.automobiles OWNER TO autobase;

--
-- Name: automobiles_auto_id_seq; Type: SEQUENCE; Schema: public; Owner: autobase
--

CREATE SEQUENCE public.automobiles_auto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.automobiles_auto_id_seq OWNER TO autobase;

--
-- Name: automobiles_auto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autobase
--

ALTER SEQUENCE public.automobiles_auto_id_seq OWNED BY public.automobiles.auto_id;


--
-- Name: azs; Type: TABLE; Schema: public; Owner: autobase
--

CREATE TABLE public.azs (
    azs_id integer NOT NULL,
    azs_name character varying,
    number character varying,
    adress character varying,
    closed boolean,
    fuel character varying
);


ALTER TABLE public.azs OWNER TO autobase;

--
-- Name: azs_azs_id_seq; Type: SEQUENCE; Schema: public; Owner: autobase
--

CREATE SEQUENCE public.azs_azs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.azs_azs_id_seq OWNER TO autobase;

--
-- Name: azs_azs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autobase
--

ALTER SEQUENCE public.azs_azs_id_seq OWNED BY public.azs.azs_id;


--
-- Name: contracts; Type: TABLE; Schema: public; Owner: autobase
--

CREATE TABLE public.contracts (
    contract_id integer NOT NULL,
    base_id integer NOT NULL,
    azs_id integer NOT NULL
);


ALTER TABLE public.contracts OWNER TO autobase;

--
-- Name: contracts_contract_id_seq; Type: SEQUENCE; Schema: public; Owner: autobase
--

CREATE SEQUENCE public.contracts_contract_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contracts_contract_id_seq OWNER TO autobase;

--
-- Name: contracts_contract_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autobase
--

ALTER SEQUENCE public.contracts_contract_id_seq OWNED BY public.contracts.contract_id;


--
-- Name: autobases base_id; Type: DEFAULT; Schema: public; Owner: autobase
--

ALTER TABLE ONLY public.autobases ALTER COLUMN base_id SET DEFAULT nextval('public.autobases_base_id_seq'::regclass);


--
-- Name: automobiles auto_id; Type: DEFAULT; Schema: public; Owner: autobase
--

ALTER TABLE ONLY public.automobiles ALTER COLUMN auto_id SET DEFAULT nextval('public.automobiles_auto_id_seq'::regclass);


--
-- Name: azs azs_id; Type: DEFAULT; Schema: public; Owner: autobase
--

ALTER TABLE ONLY public.azs ALTER COLUMN azs_id SET DEFAULT nextval('public.azs_azs_id_seq'::regclass);


--
-- Name: contracts contract_id; Type: DEFAULT; Schema: public; Owner: autobase
--

ALTER TABLE ONLY public.contracts ALTER COLUMN contract_id SET DEFAULT nextval('public.contracts_contract_id_seq'::regclass);


--
-- Data for Name: autobases; Type: TABLE DATA; Schema: public; Owner: autobase
--

COPY public.autobases (base_id, number, adress) FROM stdin;
1	АБ1	г.Москва, улица Королева, дом 1,стр. 1
2	БВ3	г.Москва, улица Победы,дом 56
3	БВ2	г.Москва, улица Ленина, дом 2
4	АГ4	г.Москва, улица Мира, дом 10,стр. 2
\.


--
-- Data for Name: automobiles; Type: TABLE DATA; Schema: public; Owner: autobase
--

COPY public.automobiles (auto_id, auto_firma, auto_model, auto_type, state_number, fuel, base_id) FROM stdin;
1	Toyota	Camry	седан	A123БВ177	A95	1
2	Ford	Focus	хэтчбек	С456ДЕ23	Дизель	2
3	BMW	X5	кроссовер	У789АУ55	А98	1
4	Audi	A4	седан	Д431НЕ77	А95	3
5	Mercedes	C-Class	седан	А411ДЛ99	Дизель	2
6	Honda	Civic	седан	В124РК99	А95	4
7	Kia	Sportage	кроссовер	О984ИР177	А98	3
8	Hyundai	Santa Fe	внедорожник	А534ОЛ99	Дизель	2
9	Nissan	Qashqai	кроссовер	Р413ХУ177	А92	4
10	Volkswagen	Golf	хэтчбек	У574ОХ94	Дизель	1
11	Subaru	Outback	универсал	Н842ЛО94	А95	2
12	Peugeot	308	хэтчбек	Д643ЖО95	А95	3
13	Chevrolet	Tahoo	внедорожник	Я537РИ99	А98	4
14	Renault	Kaptur	кроссовер	Р599ОО99	А95	3
15	Fiat	500	хэтчбек	У621УУ77	А98	2
16	Jaguar	F-Type	купе	А111АА99	А98	1
17	Land Rover	Range Rover	внедорожник	Х777УХ177	Дизель	4
18	Mazda	CX-5	кроссовер	М673АО999	А95	2
19	Opel	Astra	хэтчбек	Р888ОА99	А92	1
20	Skoda	Octavia	универсал	Л498ОР177	Дизель	3
\.


--
-- Data for Name: azs; Type: TABLE DATA; Schema: public; Owner: autobase
--

COPY public.azs (azs_id, azs_name, number, adress, closed, fuel) FROM stdin;
1	Лукойл	AЛ-9	г.Москва, улица Королева	f	 А76,АИ92,АИ95
2	Газпром	ГЗ-4	г.Москва, улица Победы	t	 А76,АИ92,АИ95,АИ98,Дт
3	Роснефть	РН-5	г.Москва, улица Солнечная	f	АИ92,АИ95
4	ТНК	Т9	г.Москва, улица Мира	t	АИ95,Дт
\.


--
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: autobase
--

COPY public.contracts (contract_id, base_id, azs_id) FROM stdin;
1	1	1
2	2	2
3	3	3
4	4	4
5	1	2
6	1	3
\.


--
-- Name: autobases_base_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autobase
--

SELECT pg_catalog.setval('public.autobases_base_id_seq', 1, false);


--
-- Name: automobiles_auto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autobase
--

SELECT pg_catalog.setval('public.automobiles_auto_id_seq', 2, true);


--
-- Name: azs_azs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autobase
--

SELECT pg_catalog.setval('public.azs_azs_id_seq', 1, false);


--
-- Name: contracts_contract_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autobase
--

SELECT pg_catalog.setval('public.contracts_contract_id_seq', 1, true);


--
-- Name: autobases autobases_pk; Type: CONSTRAINT; Schema: public; Owner: autobase
--

ALTER TABLE ONLY public.autobases
    ADD CONSTRAINT autobases_pk PRIMARY KEY (base_id);


--
-- Name: automobiles automobiles_pk; Type: CONSTRAINT; Schema: public; Owner: autobase
--

ALTER TABLE ONLY public.automobiles
    ADD CONSTRAINT automobiles_pk PRIMARY KEY (auto_id);


--
-- Name: azs azs_pk; Type: CONSTRAINT; Schema: public; Owner: autobase
--

ALTER TABLE ONLY public.azs
    ADD CONSTRAINT azs_pk PRIMARY KEY (azs_id);


--
-- Name: contracts contracts_pk; Type: CONSTRAINT; Schema: public; Owner: autobase
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pk PRIMARY KEY (contract_id);


--
-- Name: automobiles_fuel_id_idx; Type: INDEX; Schema: public; Owner: autobase
--

CREATE INDEX automobiles_fuel_id_idx ON public.automobiles USING btree (fuel);


--
-- PostgreSQL database dump complete
--

