--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

--
-- Name: nest-news-blog; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "nest-news-blog" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE "nest-news-blog" OWNER TO postgres;

\connect -reuse-previous=on "dbname='nest-news-blog'"

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
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "newsId" integer
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    cover text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_id_seq OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    roles text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments (id, message, "createdAt", "updatedAt", "userId", "newsId") VALUES (1, 'First. Comment text', '2023-03-07 14:58:07.755659', '2023-03-07 14:58:07.755659', 2, 1);
INSERT INTO public.comments (id, message, "createdAt", "updatedAt", "userId", "newsId") VALUES (23, 'second сообщеине', '2023-03-10 15:04:08.014619', '2023-03-10 15:04:08.014619', 2, 1);
INSERT INTO public.comments (id, message, "createdAt", "updatedAt", "userId", "newsId") VALUES (22, 'Edited Third commen1t', '2023-03-10 15:04:07.605509', '2023-03-10 15:41:17.698207', 2, 1);
INSERT INTO public.comments (id, message, "createdAt", "updatedAt", "userId", "newsId") VALUES (29, '321Create123', '2023-03-13 13:52:06.174438', '2023-03-15 12:23:25.505035', 2, 3);
INSERT INTO public.comments (id, message, "createdAt", "updatedAt", "userId", "newsId") VALUES (38, 'new', '2023-03-15 17:04:31.784476', '2023-03-15 17:04:31.784476', 2, 3);
INSERT INTO public.comments (id, message, "createdAt", "updatedAt", "userId", "newsId") VALUES (41, 'aweq1112', '2023-03-15 17:06:48.894391', '2023-03-15 17:06:48.894391', 5, 3);
INSERT INTO public.comments (id, message, "createdAt", "updatedAt", "userId", "newsId") VALUES (40, 'aweq1112', '2023-03-15 17:06:42.814093', '2023-03-15 17:06:52.195358', 5, 3);


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news (id, title, description, cover, "createdAt", "updatedAt", "userId") VALUES (1, 'First news', 'Description first news', NULL, '2023-03-07 11:56:46.86856', '2023-03-07 11:56:46.86856', 2);
INSERT INTO public.news (id, title, description, cover, "createdAt", "updatedAt", "userId") VALUES (2, 'Third', 'Third news description', NULL, '2023-03-07 15:32:43.517332', '2023-03-07 15:32:43.517332', 2);
INSERT INTO public.news (id, title, description, cover, "createdAt", "updatedAt", "userId") VALUES (3, 'Коты прекрасны...', 'Проверка прав на создание UseGuard', '/d284eea9-095c-4631-8839-b5ab32929c26.png', '2023-03-09 08:07:09.921099', '2023-03-10 10:53:07.234842', 3);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, "firstName", email, password, roles, "createdAt", "updatedAt") VALUES (3, 'Eger', 't@tut.by', '$2b$10$46442aRyz0Eq5z3NUPMl7OXDD4pDDxFIq7CKy4jc0avLjoXr1NbOq', 'admin', '2023-03-09 08:03:58.632878', '2023-03-09 17:12:04.78777');
INSERT INTO public.users (id, "firstName", email, password, roles, "createdAt", "updatedAt") VALUES (2, 'Eugen', 'zland@bntu.by', '$2b$10$bd1b5RczQGlwU5YYxBcQEOY/taAc/89qP/CwzA08WGTrOGSmcNDBW', 'admin', '2023-03-07 14:52:23.60325', '2023-03-07 14:52:23.60325');
INSERT INTO public.users (id, "firstName", email, password, roles, "createdAt", "updatedAt") VALUES (5, 'Vovka', 'pro@bntu.by', '$2b$10$34DNjDPI4AsvLoadzYBTluXKsLnfmGWXFqen4eLdw08x1EbAcrJ0u', 'user', '2023-03-15 17:05:32.443964', '2023-03-15 17:05:32.443964');


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 41, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: news PK_39a43dfcb6007180f04aff2357e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY (id);


--
-- Name: comments PK_8bf68bc960f2b69e818bdb90dcb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: comments FK_7e8d7c49f218ebb14314fdb3749; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: comments FK_86fb3a1330e43f9767b3b6df238; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_86fb3a1330e43f9767b3b6df238" FOREIGN KEY ("newsId") REFERENCES public.news(id);


--
-- Name: news FK_9198b86c4c22bf6852c43f3b44e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

