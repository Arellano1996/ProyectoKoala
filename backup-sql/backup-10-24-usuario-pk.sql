PGDMP  %                	    |            postgres    16.4    16.4 W    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4996            �           0    0    DATABASE postgres    ACL     /   GRANT ALL ON DATABASE postgres TO arellano196;
                   postgres    false    4996                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2                        3079    16397 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    3            �            1259    16416    artista    TABLE     �   CREATE TABLE public.artista (
    "ArtistaId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "Nombre" text NOT NULL,
    "Slug" character varying NOT NULL
);
    DROP TABLE public.artista;
       public         heap    postgres    false    3            �            1259    16408    bateria    TABLE       CREATE TABLE public.bateria (
    "BateriaId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "Nombre" character varying NOT NULL,
    "Descripcion" character varying,
    "BPM" character varying,
    "URL" character varying,
    "usuarioUsuarioId" uuid
);
    DROP TABLE public.bateria;
       public         heap    postgres    false    3            �            1259    16468    cancion    TABLE     :  CREATE TABLE public.cancion (
    "CancionId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "UsuarioId" character varying NOT NULL,
    "Nombre" character varying NOT NULL,
    "Slug" character varying NOT NULL,
    "Tono" character varying,
    "BPM" character varying,
    "Duracion" character varying
);
    DROP TABLE public.cancion;
       public         heap    postgres    false    3            �            1259    16499    cancion_artistas_artista    TABLE     }   CREATE TABLE public.cancion_artistas_artista (
    "cancionCancionId" uuid NOT NULL,
    "artistaArtistaId" uuid NOT NULL
);
 ,   DROP TABLE public.cancion_artistas_artista;
       public         heap    postgres    false            �            1259    16513    cancion_baterias_bateria    TABLE     }   CREATE TABLE public.cancion_baterias_bateria (
    "cancionCancionId" uuid NOT NULL,
    "bateriaBateriaId" uuid NOT NULL
);
 ,   DROP TABLE public.cancion_baterias_bateria;
       public         heap    postgres    false            �            1259    16506    cancion_generos_genero    TABLE     y   CREATE TABLE public.cancion_generos_genero (
    "cancionCancionId" uuid NOT NULL,
    "generoGeneroId" uuid NOT NULL
);
 *   DROP TABLE public.cancion_generos_genero;
       public         heap    postgres    false            �            1259    16520    cancion_usuarios_usuario    TABLE     }   CREATE TABLE public.cancion_usuarios_usuario (
    "cancionCancionId" uuid NOT NULL,
    "usuarioUsuarioId" uuid NOT NULL
);
 ,   DROP TABLE public.cancion_usuarios_usuario;
       public         heap    postgres    false            �            1259    16436    comentarios_letra    TABLE     �   CREATE TABLE public.comentarios_letra (
    "ComentariosLetraId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "Nombre" character varying NOT NULL,
    "Comentario" character varying NOT NULL,
    "letraLetraId" uuid
);
 %   DROP TABLE public.comentarios_letra;
       public         heap    postgres    false    3            �            1259    16444    configuraciones_letra    TABLE     �   CREATE TABLE public.configuraciones_letra (
    "ConfiguracionesLetraId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "Nombre" character varying NOT NULL,
    "ConfiguracionJSON" character varying NOT NULL,
    "letraLetraId" uuid
);
 )   DROP TABLE public.configuraciones_letra;
       public         heap    postgres    false    3            �            1259    16426    genero    TABLE     �   CREATE TABLE public.genero (
    "GeneroId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "Nombre" text NOT NULL,
    "Slug" character varying NOT NULL
);
    DROP TABLE public.genero;
       public         heap    postgres    false    3            �            1259    16452    letra    TABLE     �   CREATE TABLE public.letra (
    "LetraId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "Letra" character varying NOT NULL,
    "Tono" character varying,
    "cancionCancionId" uuid,
    "usuarioUsuarioId" uuid
);
    DROP TABLE public.letra;
       public         heap    postgres    false    3            �            1259    16491 
   letra_live    TABLE       CREATE TABLE public.letra_live (
    "LetraLiveId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "UsuarioId" character varying NOT NULL,
    "LetraId" character varying NOT NULL,
    "Tono" integer NOT NULL,
    "ConfiguracionId" character varying
);
    DROP TABLE public.letra_live;
       public         heap    postgres    false    3            �            1259    16460    link    TABLE       CREATE TABLE public.link (
    "LinkId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "URL" character varying NOT NULL,
    "Descripcion" character varying,
    "Tono" character varying,
    "Default" boolean NOT NULL,
    "usuarioUsuarioId" uuid,
    "cancionCancionId" uuid
);
    DROP TABLE public.link;
       public         heap    postgres    false    3            �            1259    16476    usuario    TABLE     �  CREATE TABLE public.usuario (
    "UsuarioId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "Nombre" text NOT NULL,
    "Slug" text NOT NULL,
    "Correo" text NOT NULL,
    "Contrasena" character varying NOT NULL,
    "Socios" character varying,
    "Suscripcion" character varying,
    "HistorialDonaciones" character varying,
    "Referidos" character varying,
    "CodigoReferido" character varying,
    "PerfilVerificado" boolean DEFAULT false NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false    3            �            1259    16527    usuario_canciones_cancion    TABLE     ~   CREATE TABLE public.usuario_canciones_cancion (
    "usuarioUsuarioId" uuid NOT NULL,
    "cancionCancionId" uuid NOT NULL
);
 -   DROP TABLE public.usuario_canciones_cancion;
       public         heap    postgres    false            q          0    16416    artista 
   TABLE DATA           @   COPY public.artista ("ArtistaId", "Nombre", "Slug") FROM stdin;
    public          postgres    false    218   y       p          0    16408    bateria 
   TABLE DATA           i   COPY public.bateria ("BateriaId", "Nombre", "Descripcion", "BPM", "URL", "usuarioUsuarioId") FROM stdin;
    public          postgres    false    217   �       w          0    16468    cancion 
   TABLE DATA           h   COPY public.cancion ("CancionId", "UsuarioId", "Nombre", "Slug", "Tono", "BPM", "Duracion") FROM stdin;
    public          postgres    false    224    �       z          0    16499    cancion_artistas_artista 
   TABLE DATA           Z   COPY public.cancion_artistas_artista ("cancionCancionId", "artistaArtistaId") FROM stdin;
    public          postgres    false    227   �       |          0    16513    cancion_baterias_bateria 
   TABLE DATA           Z   COPY public.cancion_baterias_bateria ("cancionCancionId", "bateriaBateriaId") FROM stdin;
    public          postgres    false    229   ��       {          0    16506    cancion_generos_genero 
   TABLE DATA           V   COPY public.cancion_generos_genero ("cancionCancionId", "generoGeneroId") FROM stdin;
    public          postgres    false    228   �       }          0    16520    cancion_usuarios_usuario 
   TABLE DATA           Z   COPY public.cancion_usuarios_usuario ("cancionCancionId", "usuarioUsuarioId") FROM stdin;
    public          postgres    false    230   E�       s          0    16436    comentarios_letra 
   TABLE DATA           i   COPY public.comentarios_letra ("ComentariosLetraId", "Nombre", "Comentario", "letraLetraId") FROM stdin;
    public          postgres    false    220   ��       t          0    16444    configuraciones_letra 
   TABLE DATA           x   COPY public.configuraciones_letra ("ConfiguracionesLetraId", "Nombre", "ConfiguracionJSON", "letraLetraId") FROM stdin;
    public          postgres    false    221           r          0    16426    genero 
   TABLE DATA           >   COPY public.genero ("GeneroId", "Nombre", "Slug") FROM stdin;
    public          postgres    false    219   ߠ       u          0    16452    letra 
   TABLE DATA           c   COPY public.letra ("LetraId", "Letra", "Tono", "cancionCancionId", "usuarioUsuarioId") FROM stdin;
    public          postgres    false    222   �       y          0    16491 
   letra_live 
   TABLE DATA           f   COPY public.letra_live ("LetraLiveId", "UsuarioId", "LetraId", "Tono", "ConfiguracionId") FROM stdin;
    public          postgres    false    226   �,      v          0    16460    link 
   TABLE DATA           y   COPY public.link ("LinkId", "URL", "Descripcion", "Tono", "Default", "usuarioUsuarioId", "cancionCancionId") FROM stdin;
    public          postgres    false    223   C-      x          0    16476    usuario 
   TABLE DATA           �   COPY public.usuario ("UsuarioId", "Nombre", "Slug", "Correo", "Contrasena", "Socios", "Suscripcion", "HistorialDonaciones", "Referidos", "CodigoReferido", "PerfilVerificado") FROM stdin;
    public          postgres    false    225   `-      ~          0    16527    usuario_canciones_cancion 
   TABLE DATA           [   COPY public.usuario_canciones_cancion ("usuarioUsuarioId", "cancionCancionId") FROM stdin;
    public          postgres    false    231   .      �           2606    16510 5   cancion_generos_genero PK_04617f12e44703a10d0ae6924fb 
   CONSTRAINT     �   ALTER TABLE ONLY public.cancion_generos_genero
    ADD CONSTRAINT "PK_04617f12e44703a10d0ae6924fb" PRIMARY KEY ("cancionCancionId", "generoGeneroId");
 a   ALTER TABLE ONLY public.cancion_generos_genero DROP CONSTRAINT "PK_04617f12e44703a10d0ae6924fb";
       public            postgres    false    228    228            �           2606    16498 )   letra_live PK_0ff57c206b08ca1d4294b4e7c45 
   CONSTRAINT     t   ALTER TABLE ONLY public.letra_live
    ADD CONSTRAINT "PK_0ff57c206b08ca1d4294b4e7c45" PRIMARY KEY ("LetraLiveId");
 U   ALTER TABLE ONLY public.letra_live DROP CONSTRAINT "PK_0ff57c206b08ca1d4294b4e7c45";
       public            postgres    false    226            �           2606    16524 7   cancion_usuarios_usuario PK_1ccff2c37e37229c5b17f714625 
   CONSTRAINT     �   ALTER TABLE ONLY public.cancion_usuarios_usuario
    ADD CONSTRAINT "PK_1ccff2c37e37229c5b17f714625" PRIMARY KEY ("cancionCancionId", "usuarioUsuarioId");
 c   ALTER TABLE ONLY public.cancion_usuarios_usuario DROP CONSTRAINT "PK_1ccff2c37e37229c5b17f714625";
       public            postgres    false    230    230            �           2606    16443 0   comentarios_letra PK_205c95fabc07b4d40c1792ab1ca 
   CONSTRAINT     �   ALTER TABLE ONLY public.comentarios_letra
    ADD CONSTRAINT "PK_205c95fabc07b4d40c1792ab1ca" PRIMARY KEY ("ComentariosLetraId");
 \   ALTER TABLE ONLY public.comentarios_letra DROP CONSTRAINT "PK_205c95fabc07b4d40c1792ab1ca";
       public            postgres    false    220            �           2606    16517 7   cancion_baterias_bateria PK_2835e5f2659f7f046b3734dcdfd 
   CONSTRAINT     �   ALTER TABLE ONLY public.cancion_baterias_bateria
    ADD CONSTRAINT "PK_2835e5f2659f7f046b3734dcdfd" PRIMARY KEY ("cancionCancionId", "bateriaBateriaId");
 c   ALTER TABLE ONLY public.cancion_baterias_bateria DROP CONSTRAINT "PK_2835e5f2659f7f046b3734dcdfd";
       public            postgres    false    229    229            �           2606    16423 &   artista PK_2af2557f7b7f007823bcd09ac7d 
   CONSTRAINT     o   ALTER TABLE ONLY public.artista
    ADD CONSTRAINT "PK_2af2557f7b7f007823bcd09ac7d" PRIMARY KEY ("ArtistaId");
 R   ALTER TABLE ONLY public.artista DROP CONSTRAINT "PK_2af2557f7b7f007823bcd09ac7d";
       public            postgres    false    218            �           2606    16415 &   bateria PK_7de592a4a7accc6ea07f8c6fe9d 
   CONSTRAINT     o   ALTER TABLE ONLY public.bateria
    ADD CONSTRAINT "PK_7de592a4a7accc6ea07f8c6fe9d" PRIMARY KEY ("BateriaId");
 R   ALTER TABLE ONLY public.bateria DROP CONSTRAINT "PK_7de592a4a7accc6ea07f8c6fe9d";
       public            postgres    false    217            �           2606    16467 #   link PK_8cd057c0d946755aeeb4e70f80e 
   CONSTRAINT     i   ALTER TABLE ONLY public.link
    ADD CONSTRAINT "PK_8cd057c0d946755aeeb4e70f80e" PRIMARY KEY ("LinkId");
 O   ALTER TABLE ONLY public.link DROP CONSTRAINT "PK_8cd057c0d946755aeeb4e70f80e";
       public            postgres    false    223            �           2606    16475 &   cancion PK_8e28b55e54332f382369809ee1c 
   CONSTRAINT     o   ALTER TABLE ONLY public.cancion
    ADD CONSTRAINT "PK_8e28b55e54332f382369809ee1c" PRIMARY KEY ("CancionId");
 R   ALTER TABLE ONLY public.cancion DROP CONSTRAINT "PK_8e28b55e54332f382369809ee1c";
       public            postgres    false    224            �           2606    16433 %   genero PK_991dde88b024929c4725b5d7a9c 
   CONSTRAINT     m   ALTER TABLE ONLY public.genero
    ADD CONSTRAINT "PK_991dde88b024929c4725b5d7a9c" PRIMARY KEY ("GeneroId");
 Q   ALTER TABLE ONLY public.genero DROP CONSTRAINT "PK_991dde88b024929c4725b5d7a9c";
       public            postgres    false    219            �           2606    16503 7   cancion_artistas_artista PK_c58316624f778960a7e9af77eab 
   CONSTRAINT     �   ALTER TABLE ONLY public.cancion_artistas_artista
    ADD CONSTRAINT "PK_c58316624f778960a7e9af77eab" PRIMARY KEY ("cancionCancionId", "artistaArtistaId");
 c   ALTER TABLE ONLY public.cancion_artistas_artista DROP CONSTRAINT "PK_c58316624f778960a7e9af77eab";
       public            postgres    false    227    227            �           2606    16451 4   configuraciones_letra PK_d412a31f5c96a2f4cb7303c0560 
   CONSTRAINT     �   ALTER TABLE ONLY public.configuraciones_letra
    ADD CONSTRAINT "PK_d412a31f5c96a2f4cb7303c0560" PRIMARY KEY ("ConfiguracionesLetraId");
 `   ALTER TABLE ONLY public.configuraciones_letra DROP CONSTRAINT "PK_d412a31f5c96a2f4cb7303c0560";
       public            postgres    false    221            �           2606    16459 $   letra PK_e0d1ba3b50a948797009aea4722 
   CONSTRAINT     k   ALTER TABLE ONLY public.letra
    ADD CONSTRAINT "PK_e0d1ba3b50a948797009aea4722" PRIMARY KEY ("LetraId");
 P   ALTER TABLE ONLY public.letra DROP CONSTRAINT "PK_e0d1ba3b50a948797009aea4722";
       public            postgres    false    222            �           2606    16484 &   usuario PK_e7f4285c3e192ff73e5761782b3 
   CONSTRAINT     o   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_e7f4285c3e192ff73e5761782b3" PRIMARY KEY ("UsuarioId");
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "PK_e7f4285c3e192ff73e5761782b3";
       public            postgres    false    225            �           2606    16531 8   usuario_canciones_cancion PK_e9af315dce3d11e758a1ccec6be 
   CONSTRAINT     �   ALTER TABLE ONLY public.usuario_canciones_cancion
    ADD CONSTRAINT "PK_e9af315dce3d11e758a1ccec6be" PRIMARY KEY ("usuarioUsuarioId", "cancionCancionId");
 d   ALTER TABLE ONLY public.usuario_canciones_cancion DROP CONSTRAINT "PK_e9af315dce3d11e758a1ccec6be";
       public            postgres    false    231    231            �           2606    16425 &   artista UQ_015f04e46ed1d77c2abc442c853 
   CONSTRAINT     g   ALTER TABLE ONLY public.artista
    ADD CONSTRAINT "UQ_015f04e46ed1d77c2abc442c853" UNIQUE ("Nombre");
 R   ALTER TABLE ONLY public.artista DROP CONSTRAINT "UQ_015f04e46ed1d77c2abc442c853";
       public            postgres    false    218            �           2606    16488 &   usuario UQ_16dcf788142caba23053d107dc7 
   CONSTRAINT     e   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_16dcf788142caba23053d107dc7" UNIQUE ("Slug");
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_16dcf788142caba23053d107dc7";
       public            postgres    false    225            �           2606    16486 &   usuario UQ_8dad897698210886ec786a351f7 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_8dad897698210886ec786a351f7" UNIQUE ("Nombre");
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_8dad897698210886ec786a351f7";
       public            postgres    false    225            �           2606    16435 %   genero UQ_d1dcdf12250537555352a3951eb 
   CONSTRAINT     f   ALTER TABLE ONLY public.genero
    ADD CONSTRAINT "UQ_d1dcdf12250537555352a3951eb" UNIQUE ("Nombre");
 Q   ALTER TABLE ONLY public.genero DROP CONSTRAINT "UQ_d1dcdf12250537555352a3951eb";
       public            postgres    false    219            �           2606    16490 &   usuario UQ_d40b21e28c76c94ecc540f87cb5 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_d40b21e28c76c94ecc540f87cb5" UNIQUE ("Correo");
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_d40b21e28c76c94ecc540f87cb5";
       public            postgres    false    225            �           1259    16504    IDX_1952866c4ca51045cfcf0150c2    INDEX     s   CREATE INDEX "IDX_1952866c4ca51045cfcf0150c2" ON public.cancion_artistas_artista USING btree ("cancionCancionId");
 4   DROP INDEX public."IDX_1952866c4ca51045cfcf0150c2";
       public            postgres    false    227            �           1259    16512    IDX_425b672862ec785dcc3fcbd260    INDEX     o   CREATE INDEX "IDX_425b672862ec785dcc3fcbd260" ON public.cancion_generos_genero USING btree ("generoGeneroId");
 4   DROP INDEX public."IDX_425b672862ec785dcc3fcbd260";
       public            postgres    false    228            �           1259    16505    IDX_47d1380574bbd431ccc1a4b4ab    INDEX     s   CREATE INDEX "IDX_47d1380574bbd431ccc1a4b4ab" ON public.cancion_artistas_artista USING btree ("artistaArtistaId");
 4   DROP INDEX public."IDX_47d1380574bbd431ccc1a4b4ab";
       public            postgres    false    227            �           1259    16532    IDX_5a3b927461b7a0fe3bc454ba8f    INDEX     t   CREATE INDEX "IDX_5a3b927461b7a0fe3bc454ba8f" ON public.usuario_canciones_cancion USING btree ("usuarioUsuarioId");
 4   DROP INDEX public."IDX_5a3b927461b7a0fe3bc454ba8f";
       public            postgres    false    231            �           1259    16526    IDX_64fb75b977af26b50a7b220f9d    INDEX     s   CREATE INDEX "IDX_64fb75b977af26b50a7b220f9d" ON public.cancion_usuarios_usuario USING btree ("usuarioUsuarioId");
 4   DROP INDEX public."IDX_64fb75b977af26b50a7b220f9d";
       public            postgres    false    230            �           1259    16511    IDX_9205b1b00da08b430c92d952fd    INDEX     q   CREATE INDEX "IDX_9205b1b00da08b430c92d952fd" ON public.cancion_generos_genero USING btree ("cancionCancionId");
 4   DROP INDEX public."IDX_9205b1b00da08b430c92d952fd";
       public            postgres    false    228            �           1259    16518    IDX_c6f49b670bae3f00d44ee4eae5    INDEX     s   CREATE INDEX "IDX_c6f49b670bae3f00d44ee4eae5" ON public.cancion_baterias_bateria USING btree ("cancionCancionId");
 4   DROP INDEX public."IDX_c6f49b670bae3f00d44ee4eae5";
       public            postgres    false    229            �           1259    16519    IDX_ccc9634c036fc4a1a9d5092424    INDEX     s   CREATE INDEX "IDX_ccc9634c036fc4a1a9d5092424" ON public.cancion_baterias_bateria USING btree ("bateriaBateriaId");
 4   DROP INDEX public."IDX_ccc9634c036fc4a1a9d5092424";
       public            postgres    false    229            �           1259    16533    IDX_eab39479e0475b53b3f4bef619    INDEX     t   CREATE INDEX "IDX_eab39479e0475b53b3f4bef619" ON public.usuario_canciones_cancion USING btree ("cancionCancionId");
 4   DROP INDEX public."IDX_eab39479e0475b53b3f4bef619";
       public            postgres    false    231            �           1259    16525    IDX_f78563727ac200cb35ef18bb8a    INDEX     s   CREATE INDEX "IDX_f78563727ac200cb35ef18bb8a" ON public.cancion_usuarios_usuario USING btree ("cancionCancionId");
 4   DROP INDEX public."IDX_f78563727ac200cb35ef18bb8a";
       public            postgres    false    230            �           2606    16569 7   cancion_artistas_artista FK_1952866c4ca51045cfcf0150c28    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion_artistas_artista
    ADD CONSTRAINT "FK_1952866c4ca51045cfcf0150c28" FOREIGN KEY ("cancionCancionId") REFERENCES public.cancion("CancionId") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cancion_artistas_artista DROP CONSTRAINT "FK_1952866c4ca51045cfcf0150c28";
       public          postgres    false    224    4785    227            �           2606    16544 4   configuraciones_letra FK_3dfbb9284ceb905b090555075de    FK CONSTRAINT     �   ALTER TABLE ONLY public.configuraciones_letra
    ADD CONSTRAINT "FK_3dfbb9284ceb905b090555075de" FOREIGN KEY ("letraLetraId") REFERENCES public.letra("LetraId") ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.configuraciones_letra DROP CONSTRAINT "FK_3dfbb9284ceb905b090555075de";
       public          postgres    false    4781    221    222            �           2606    16549 $   letra FK_40501110284b677f4ed615f5ba9    FK CONSTRAINT     �   ALTER TABLE ONLY public.letra
    ADD CONSTRAINT "FK_40501110284b677f4ed615f5ba9" FOREIGN KEY ("cancionCancionId") REFERENCES public.cancion("CancionId") ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.letra DROP CONSTRAINT "FK_40501110284b677f4ed615f5ba9";
       public          postgres    false    222    4785    224            �           2606    16584 5   cancion_generos_genero FK_425b672862ec785dcc3fcbd2606    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion_generos_genero
    ADD CONSTRAINT "FK_425b672862ec785dcc3fcbd2606" FOREIGN KEY ("generoGeneroId") REFERENCES public.genero("GeneroId") ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.cancion_generos_genero DROP CONSTRAINT "FK_425b672862ec785dcc3fcbd2606";
       public          postgres    false    228    219    4773            �           2606    16574 7   cancion_artistas_artista FK_47d1380574bbd431ccc1a4b4ab4    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion_artistas_artista
    ADD CONSTRAINT "FK_47d1380574bbd431ccc1a4b4ab4" FOREIGN KEY ("artistaArtistaId") REFERENCES public.artista("ArtistaId") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cancion_artistas_artista DROP CONSTRAINT "FK_47d1380574bbd431ccc1a4b4ab4";
       public          postgres    false    4769    218    227            �           2606    16609 8   usuario_canciones_cancion FK_5a3b927461b7a0fe3bc454ba8ff    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario_canciones_cancion
    ADD CONSTRAINT "FK_5a3b927461b7a0fe3bc454ba8ff" FOREIGN KEY ("usuarioUsuarioId") REFERENCES public.usuario("UsuarioId") ON UPDATE CASCADE ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.usuario_canciones_cancion DROP CONSTRAINT "FK_5a3b927461b7a0fe3bc454ba8ff";
       public          postgres    false    225    231    4787            �           2606    16534 &   bateria FK_5eb7f28d33d190d0c98914896c5    FK CONSTRAINT     �   ALTER TABLE ONLY public.bateria
    ADD CONSTRAINT "FK_5eb7f28d33d190d0c98914896c5" FOREIGN KEY ("usuarioUsuarioId") REFERENCES public.usuario("UsuarioId");
 R   ALTER TABLE ONLY public.bateria DROP CONSTRAINT "FK_5eb7f28d33d190d0c98914896c5";
       public          postgres    false    217    225    4787            �           2606    16564 #   link FK_5ec7e2986c060ff46c423b528ea    FK CONSTRAINT     �   ALTER TABLE ONLY public.link
    ADD CONSTRAINT "FK_5ec7e2986c060ff46c423b528ea" FOREIGN KEY ("cancionCancionId") REFERENCES public.cancion("CancionId") ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.link DROP CONSTRAINT "FK_5ec7e2986c060ff46c423b528ea";
       public          postgres    false    4785    224    223            �           2606    16604 7   cancion_usuarios_usuario FK_64fb75b977af26b50a7b220f9d4    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion_usuarios_usuario
    ADD CONSTRAINT "FK_64fb75b977af26b50a7b220f9d4" FOREIGN KEY ("usuarioUsuarioId") REFERENCES public.usuario("UsuarioId");
 c   ALTER TABLE ONLY public.cancion_usuarios_usuario DROP CONSTRAINT "FK_64fb75b977af26b50a7b220f9d4";
       public          postgres    false    225    4787    230            �           2606    16554 $   letra FK_83d1355938f7552da521da80cf7    FK CONSTRAINT     �   ALTER TABLE ONLY public.letra
    ADD CONSTRAINT "FK_83d1355938f7552da521da80cf7" FOREIGN KEY ("usuarioUsuarioId") REFERENCES public.usuario("UsuarioId");
 P   ALTER TABLE ONLY public.letra DROP CONSTRAINT "FK_83d1355938f7552da521da80cf7";
       public          postgres    false    225    4787    222            �           2606    16559 #   link FK_8816138b19af91b214ee6cd0e1e    FK CONSTRAINT     �   ALTER TABLE ONLY public.link
    ADD CONSTRAINT "FK_8816138b19af91b214ee6cd0e1e" FOREIGN KEY ("usuarioUsuarioId") REFERENCES public.usuario("UsuarioId");
 O   ALTER TABLE ONLY public.link DROP CONSTRAINT "FK_8816138b19af91b214ee6cd0e1e";
       public          postgres    false    223    4787    225            �           2606    16579 5   cancion_generos_genero FK_9205b1b00da08b430c92d952fd4    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion_generos_genero
    ADD CONSTRAINT "FK_9205b1b00da08b430c92d952fd4" FOREIGN KEY ("cancionCancionId") REFERENCES public.cancion("CancionId") ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.cancion_generos_genero DROP CONSTRAINT "FK_9205b1b00da08b430c92d952fd4";
       public          postgres    false    4785    228    224            �           2606    16539 0   comentarios_letra FK_ba53bdabaa0d2a7a0567b5c10dc    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios_letra
    ADD CONSTRAINT "FK_ba53bdabaa0d2a7a0567b5c10dc" FOREIGN KEY ("letraLetraId") REFERENCES public.letra("LetraId") ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.comentarios_letra DROP CONSTRAINT "FK_ba53bdabaa0d2a7a0567b5c10dc";
       public          postgres    false    222    4781    220            �           2606    16589 7   cancion_baterias_bateria FK_c6f49b670bae3f00d44ee4eae55    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion_baterias_bateria
    ADD CONSTRAINT "FK_c6f49b670bae3f00d44ee4eae55" FOREIGN KEY ("cancionCancionId") REFERENCES public.cancion("CancionId") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cancion_baterias_bateria DROP CONSTRAINT "FK_c6f49b670bae3f00d44ee4eae55";
       public          postgres    false    224    4785    229            �           2606    16594 7   cancion_baterias_bateria FK_ccc9634c036fc4a1a9d50924248    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion_baterias_bateria
    ADD CONSTRAINT "FK_ccc9634c036fc4a1a9d50924248" FOREIGN KEY ("bateriaBateriaId") REFERENCES public.bateria("BateriaId") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cancion_baterias_bateria DROP CONSTRAINT "FK_ccc9634c036fc4a1a9d50924248";
       public          postgres    false    229    217    4767            �           2606    16614 8   usuario_canciones_cancion FK_eab39479e0475b53b3f4bef6197    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario_canciones_cancion
    ADD CONSTRAINT "FK_eab39479e0475b53b3f4bef6197" FOREIGN KEY ("cancionCancionId") REFERENCES public.cancion("CancionId") ON UPDATE CASCADE ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.usuario_canciones_cancion DROP CONSTRAINT "FK_eab39479e0475b53b3f4bef6197";
       public          postgres    false    224    231    4785            �           2606    16599 7   cancion_usuarios_usuario FK_f78563727ac200cb35ef18bb8ae    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion_usuarios_usuario
    ADD CONSTRAINT "FK_f78563727ac200cb35ef18bb8ae" FOREIGN KEY ("cancionCancionId") REFERENCES public.cancion("CancionId") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cancion_usuarios_usuario DROP CONSTRAINT "FK_f78563727ac200cb35ef18bb8ae";
       public          postgres    false    4785    224    230            q   �  x�mVK���]'OQH#����5#���4d��� �kQ`�eVu�ꝏ�^�}1�dUc�""IFfF��"��dr�&I�d�x0�r]���.���˴n�?���1~tB�j�̔�N�<.�2"�f]�����a݈Ͱ�X�*�[+��@����Ǭ�^6��M*vC�z���9Z1�f/����P<�๒)�&��>���txG[���Ӷ�ؼ�����!�PȪ�KӒU<�T%��V�N��=ȯ��֭��>>֧�p[_����חc���_�s]��ڜ������£H��\��k�����&�w<���#�4ETd���D�%�ZI�>ҙ��ᆖ�-Wo����]��z�R��<z㰟�6r�&�3~�Bǵ_�OӂR��Z?��6��"Y��H�IJ Nk�%j.E땏�Ͷ<�m=��]���6��V F8>yn�U@��oU&����{V����·O��/���l�~�����7���Y?'��p�����E������4(dA�
pۚ.Ib���˿��v���ľ��:�X����N��ÍF�b�[)qmu֍�}���J"g�T����:z.�s�B�{���R�����\{ҏ}i��җa��T
/�!q-y �RIYg��cٻ���e[�3���;��;�dL��#0@ B� ��Y��6ٱ� >���tި{���}a����L�X@�f���ȝ�Y9	v�~y���%b��ۃ @t>�fy����P��H�V�x)XW�3�Jp����x���d�(A�@%&��~ZS�v�{����ԝ�;�H�\�{�] ���@#������p\O��o�����7?p8F�`�[SH���� "K/���ɠ�����s}��yeg����R�l!��DnD1u^fቖP%ک�y�߮T�����/� Eh��L<[�U���2��,b��A�����ڶiNi����?��ݥ�|�%�5F�Z�t�J�dٟ��ǐ5�2�A8T���T�9d&gY� 4��u[�<�@Ʒ�X�����N��C�V����*E*��'zX�Ûo4ۺ=R���� E���5&B����)!)4�mZ���ݾ��EMf������Btݦ5'U*��|��ͺ��{�����[e�U<4
0z.[�H%�c�p��7���c=_�WR��2�[i��a;L��96g��zzC��/�`�1�e��v�,�H�$�M�s6�g@oL):\Cn�.]��_[�����	U�i*q������>�d���L��{:�֫J/� �IU�J���EL3��X���	�ϏĎ0�`@	�\6쭀�dOE���,A��>�3��g�Ɩn�O0��b{��]]{G
�VF+�U+��}�@�ʺ��;�����V4�d�E��B�x(*�@�������h���X���[����� �	:͋����8�H�i�R-:7=��td�jRZ��q�*F�� .,�2�(���a�����5^�A��*R���9�>�C�Ƴ�n�L�M�N,w{<v{@'����nA���x�DU0��b��w��~��/�~f�w����a �"X��֧	�f�F���W�-m��k?��`��"#9���1�b<��Z�M�&P������bo��тX�>*~��E�JH�F�K��[�M�Hh�Pbڗmz���tyF�	.-�Q�7��0��>u��y_A�&��T���z��)��y���d�� �_�0�d���      p      x������ � �      w   �
  x��Xˎ�F<�_A`ε��cn==��b=^{�=,`��z��Jb[j��7>���o{��(�j�H�ѪJ�ʬ������R<1esf�{Èg����"Q�tEڔ�6,Q�Lk�Xt�3��qS"�����az���@�/�v�fi<N#=R���u��ɷ&�R�R��\g�Hń�\�`dPu�돔�|��}~h>�[����˩Ӂ+F����	��,��������Ӑ��8�|�.5�|s7���X�>���EC����[��']�&�}�����<�|�ʹ\��.�x��̀�I��w"���{e��A�ȓbʩ�T�ٙ�o)��swi�qY>�YCT�w6��`�p��"��ud�*YTTE9�����\�[f��a@Zq���FX[vaoևN�r,��K��+f)��-��(ɚ��^��w(��i��Vø]q[p���g�G9�K��h�2;d��,p&�Κ�j2e���ܝ��Y����y^�W�z��fRɴJ�U���D���}���O��Á>�K�_Ҽ����(�kk*�>0I�� �`�e乮Κ�����K�D�@��V�^隫b,�B2y`>Y&R>G[l�a���q{#���ֲE<��-*�8N�E���Ќ����rY�����#���kIOK\�e|�ܽ�i���"T�@$��lj���%�7D.21�М��l���L�}�7��d���(,$�V����9������y{K+�# x,�zXP��*����ٳ�-�P.�O,;]��8��9��p,�CA����q:�)�����u�����8YD*�9�Be!�&;�A���8�@�e>`���o��kf��.)+�I[\g�uj�YE˩B�d���	@`�'��r�����]� ��fW��ZNJ�����Vl�'5��(?w��Y��0wC�}v4.V��&� � �� -�\X�.P1��l�"r��2�KTX�;���ʕ<�	��-��/��Z��Iz���J,��c�"V㲺;��o��y�9k�����D�Ҩ��_�f/�}5�veZ�����ڗ�08�y���V�\$��Y������O�?��N�,6���T�m�F����`�x���t�Q��.9k�[�@���3�Lhُ����潏��l<�<���Q��XI�I{K����~��̧��=.�������C�
�TU���9�j�,/m͉�q�t�Jk �~ �WӸ��nM_�^�쌈'V�9,�µ%-$�Y�������"����ϋ8nhX��-�E_B\-���%3"(ť���y����~�FoߖwKFu��U��
F����F1W��$�'y������,�_A(C�Nthq�$�F0�j~h$�����h�@G���� 4�YM�Z���bg�����o���y�TN-�/�wg��b�G�ׄ���IX-U&��[%�W�el��E줹��D�ix�����&(�¾�Ry�2������eĥ��="�+v�����"�O/��ҶA�A�3#z�"��V

ct����5�w�-4��˹	��+����4�bm���:n�-X-{N:+%QV�����
oe��i��{adNǆ���~C��SSꗿ�ۯhv�-���TUgXmL5K ��YRU�2r/>�����wH�|�4-E���o���<41��@�!e�XHf_9��I-����4Ly����8�sw=��el�����C�H�y�djs_��Y*$���`v���$w��	:�~X�V���<.��f���� r�1�����$"�R�7�"挶���?��y�������Ň����,�{�±,"�+�>WpB�<z��{�_�Kkt쌋���x۾��L_�3\ƌ�Ƕ��9��T���H{����T.������ГF	�ݍH���ł��˭$
?go圧�'��� ����TПߌ�1Ӹ~���/��&��!�b���L���b>�{�L��V��'�,[L+RWӇ[L/1(�A+2�Q� �	D�E�������3+D� l#��C���ոp��=@�^dt� �SnMУ	B4�6B`�Iک a�������<�� �O.�q�߭�-t�J��`cq0�ÿ��TZf�wl�vI�KK��L��qٯhq�C_�	�1��Z&.��	�!�^�I�[�;>���^���m7
>B������_(r��V��v�Rz3f�� :��^'l�fP.���*�!�Z��������F�7���Z�9�`�mQ/��bm�������p�� ��(�@m�Ј�s�}_.�ʁ���uus�E�ϸ�$�W���C1��x�;yR푞���������J�QR�ZG�T{��Z� �c��lr�֨���ӹ=U,M[���~<,����{�znx{)(�ah�3� �X��P��ɽB��y�7��ᗁ~�B�e��i�e�i��.8��R�<+��aE�<g<�d`/�^�M�����&@xo!�j4M�4�!�|{��	h��4����O� ۞��m����Q}��Hi�@�8.��&3�*�8X�w�ﬖ{��i��u�ȴl���a+��
�ۜA(!���m�J�W$T��b�ٿ�Y^>���H�n}
]�Æy�'���TE� }W�w&h�\�
҅����{Xޝ��$�����4.���Kmc�VY(ע����&��F؍Hd��o7@ޖ���1MW�-q`W����^3㜱�$��>(ܿ�q\��˯�66�"%ah/L��5<������s�[$      z   �  x���K�,���{�
�4{����%܏�0h�T�s2���r��g�Qs%	3�r��t��z~~�4�1��x��F��L�w�}~���$�<���2�99�<��=��Q�A��PV����G*q�S���ҽ���e�8�iu��E�Yimu�i?YBIރ�-���ӈ��Ϲ���a6�Pf]a�'��H{�������ә�3���9�J^f�#�w�r�:��LO���TZ=1�2��b�0�j�4��[+��5��\O�R�0�,a��[�=[�/���-�Ew��Zmg��v;:~{y��r�7��FAf��Ϭ���o�^�J�|�l�YJ�U�䖻���ܖ�ڃ�D"��4�5�c���m���zpŒT�8l�m�(մ���a5jș"E�	6�9jO}|�6�&�dq��f�ϰK�j�����M&����ht�2˘��J^R�{�����Rx�铷mԧ�}��������Aͨ+x/�;i�%�d��^���SCS�"�/׼��VO[�>���y]vZ`���"}uE�*q"�:Oh�\�:^���{<"c�Qq����H�����lͦ޷��֠	� ]N����n���3n��V��3���t�H��e�ǰ]���~�Js��3;̈́�i��
ǎV�*�Y�־�d��~�/�=4��P��UZ�F��6l�N9;���i��驒�Z��+ͬ8,��1_�B�q'��c���f�2�'~f�h�ә�*���L��ă��Ç��Aљ�R)QG�Ѕ���"ԧU��R����y(�u�b�ӆ`j����q4sT�RB�����qRG]�ؾ�v/���Z[1�^9I��8}�T��!���tz���ђ���*�����1dNh���_���pJ�^��u)A�����F}�ߚ��u��'�S�[��敻���Q�ٗ������ ? �V$ٲ������8O6���T��6�M��[��y���́��Qs�p�_�8��un��-�9�`��c�V6�D�س1�rO�{h�Z�W�6�#mǫ5i�#�S��!$P��|�;�� r���}A�����%��PYx
ycJ��<%R��PdK��Y6���E~�ҳ�}�t@�k��~��l��#����#Q}ޗ�`@_t���?6"����;a��
wFj�w�������
ǉ��u��4Iӿ�&���Į�9�4)�%kS9CƔ�JV<�D�/QH=�^I��ҡ;,˛#(	"Üp��7�J�>���sM���$)4	�{;b���Q2-�#"��V�[�dҺ)zc Z��ږ ��Q���']e9	����5e�a���j? G�V�:�T�Or<�Y�0)�]Վ��2���o�H�"bi�Z��~��`*��q�+8��U����z�9l7�o��T�㬩���T�؜�Yы�
9Ib}�ؒ���BPQ)9\G�7��!�
���Q���J\�L�hfa�Ig���*2P��Y(��?莲��X)�0�_-Q�����Uz�D�㭒Wքƙ2-h�>�ůQN�HQ$?=Uڳ��)B$�����wb��<ጼU�@�D���_S���Blm���*E�����j&�Tn�2��Fr#MV7"AY�^#W`(�g�P��!b�뀒�FnO>k�r򛛓Yb{
g�V��;��4����� ��O������;�C���V	,��y��`�Bx��6sǛV`�i�VC3s#Po��.|N�շ$�T��vw�#[��+IL�� �tN���m+{��0�ޙm�K�W.��dvS�:��!<x���s�|�e�C̱�.���m�}��)�m_�#�l�����䬟�H�Dz|�����@j [�����
f2��|��2��2�u𺷚���O�d��s���Wb��6҄K�Ml7g�E6w��>���g���a�%�0��ȹ�]��]nP�
Ҕ%��� b��<h�U:��5�����dʲ7d>UX�]�[��U�]���Y���<g�д�0n~���kYH&�t�Ϗ�� f��oӈ���w�鴀���T�r��!!��0I�:p`��mv���w']<$���"�M��Nk�w�E�'aP����0I�=�G��ǭ�R�t����➛����#�xϫ�\���P���2�O@�r�Q:��v��JHĊP�rg����o��D�L"�Ǿ[��@E`�� -�=1�K"�b��T�6"�5j����&�����J���R����n���O�$�G�RW�����}��?��      |      x������ � �      {   !  x��YKr(�
'{����{yۘ�/��
�*�_;j�AH��'��G͵���t�Uҩo���=v�6�ܗ,4h�+�O������#V,a�׀|i��Tyz�锟>�66'�c�-ل�.�,S2fI^Si��<��<�(֎�-~�kH77re�6b�/�=�Ku��{��|�4���uZbL|G?ה]�ٕ��.�R��ر&�����KGb�b{ɻ���?D*eWB*U\c��n$��L��:n,��19��eWB*eWB*eg�g_�g3&�mZ���,�����X4_��t^���ݗ�����x-2�1o���I��o����w���톿�ǘ@e�}m����g��o�1po���Fܶ�f���c]�BB�&Θ�&�c�ƈd���TB��
����bY�I{�_�������㳃_X�]š&@��w����cאJ1��e<��C?-`6���ey��5/!E�&bΙ��G_���z���\C�U|��������;t�Ƴ�1ۼ��y-����T����OҸ6Й8�l�Ζ����k=^B���Ju�w�̑�F i���m��j1��J1��( �N�ߡo�`���\�������=����'�@�
.h<_�q���JH�.m�,ؗ�qh`$Z���5�+.���H��JH��ړ l��=�[vgb��Ǳ��	.!���uֆ�|�O��P�f84��v�����g�gw<�!��O%�ZgV���iu��Ze �#�z-<`{�>�C��~* �:�O��7��]�Q�[@�n�J���tc�C)�
h�)��t��a/zN4��z�a�̤x.#Q�g��JH%�T���\O������mc�w��1������,Mh5rk�����r|@�!��N=���b�6aX�b��j[��k �|�F��+̈́��
}MكZ���c�a�H��k�B���t��o��!��^4%*�������-B�A=��"�:���Z2�H���x���s�m}ιx���jĥ�:#WM7�2$�{0 �5�+!�*�p8��S~�?�1�+�j�ڥȾ%�RL�:��*c�p;���ǳ��`���b*!�b�[�"�߻������}[@���?�_;���}�z#%�Y�O01��2~�9�1�]���}�6,Z�V{�kH�������|P̓��@�w��%�A�5.(!�b�1{��K}|����Nt�=�|��jLWA���}v�ޘu�J���7ǂkX�{aY�b*!�ꄾb[���|o����֘�6�u� �b8�ݱV��x\�*g���l��y�S	��z��n|[α�r��9ᨯM]PB�VQT�jo,\�d��a�y�	�!j��KH5.8}M������o���\�l^�-%�RLD
���6,�0< w�;��"���j��@�c%$&v<FO��|V������;����^����=��yb݄�!ո�%�D�,��l`�X��9�S	��M��L�|x��s�R�I����u����!n 1uD��������Ͻpo����2z�}Hp��E�qQeu�թ!]�Вmc���?���޿�mo2n\C:�7����}:s�zX!����~��$;�١�_v���L��#bt�5�������
1���|9�yc6�VU�/F�$�Sb�?~��}/�۵��ɷӀ���?��)���{wh�"�>M^SbO��jLXm��>��hy���H+�S�VГ_���k�fy�呩qΓE]Ю\�9M�:��Ė	�]"C�̕��p�8iC�����#��	��.��e��Y�b!X���F}Nd�ܪ�U���������r-      }   P  x��W[�e+��g.ta.�GE�?�^�G`R����\/g�Yg]j.��E�ݎ�L���*��e;�蠳JI�M��4Z�gwc5~�22��߆J���*�+[�L~�t�޺.d+i�A�ک��t��J��2�d�I�8�9'N��/�g�o�$��q%�I�8�q�x�k�W��o��F5���W��ۢ�hyӚ6�?�I+K#Ȱ=� ?6ɮxn�Vo���نk[����E�J��*1�)���0�Т�w��1��n=�/�G`Lb�R��y'������҉��9u��x:7l�@��rj9����x�ɷ�[4mi��}�9�<��>�	'Z�Ȏ�T��ZR�l�{���:�<�(,Qi���+ t�ږ��|�4��&�dk�x�!��뎪��ʻ&�l�Jf��K�u��a�G<�˙�Y�2��%?[�+[F(1�. ��Pӫ��^��?N\2��S-����ܴ"n^����*��vr8qGt�s46zK(�z�;����Fw-hf(��(��U�v��;�9��X�K�a����ni�Oϣf�� &8��]�l��C�q��<Ω��6�ƙ&��k͂0�m�U��kOǜ@C���	�~�r���r�"��;9  �\�U���Ȗ���7���@�6�C�{V��Jg�>pw}a��su]07�=��ݵ�)�o8'4s"!�qٽÝ+9�Lj���p��Gґ��<e�#2�q�#�������>�.��cVY27|��|��B}} ����y�x��~tG/�ր��79}.S	Yy�������(؅�3/6k�Ň�Ωl��;�+�K��7�8K��^������������!sо��Z3^+���3��� Z���/ӕo�;�`C�ñ׀�x'�{��t�~���XI��'?-qh	t�}n�\ptJ@ۥ=槮鈚�3	P`؎M�Z,��^s��#&NAA
����K!,R68�Ȼ%�(k�yu�>Q	W	
!������A��eE�V��ЧQN��}Gm{N=�6�g��
X1q�B�)��ZF��$��3�Lu1gd_�7�%g��#[|�@,w�����AZ���FA�8�.���U|�P�݄cp��[� �e���PZ25izg�?�W̫�!@�G!(.��$�g�8�~�y�)tS��*EߓNe�̴!�n�F�b������4Q��t�ɯ���-�x������3�L�~�d����s�σ7LϿd��c��{>2��Z��*D����tx��a���^u&!q0����<�E��k"���>>@9)�%D��y�`UY)�3��E��KM7��ud_ �@"������j�HtK�P�<�ǜ �8�������~��y�]p      s      x������ � �      t      x������ � �      r     x�eRMn1^'�����$ζ]�*VH�;���4-�kq.���,�v�I��|��	R��'*+�(i ���4�Q���3?޼ן�����ם���o�URc�X0[s�8K��R����gY�aUX�'�d�>f
��T�2ܽ~;�^.�'9��!S��� Y�Y9ш��m�~����������.8\%�X3/w˧Gu�>%�@�0aD�+]j/m��Gp�ߟ��k����-*�6���(�HL%`�i(gaC�꩕�5fЙ�VHF�M<S�(Wv�N�������&?r���n�-���p�X
�X�v�a�_.������C)�=F0�����Bl*Z�f#xgjN|s=�n^��K؇��(1K
U�d��hii�K
���E�V����;u1�Z�SA���%o>�.���?������H �.��\3a08E���n��on\�cX-=!�jϰ��ˊ$Ҫ�+��f�\�Hj|Q,���չ�����ո�_��;��o��C      u      x��M��F�.���+|��g&$ �@o���J꙰<�H���Y$2d����]s��?EK-�ph�8��c7��ۮ*�	�A2I��3��*�������ㄅ��y�f��o/�>�i�
Ƨ� J����W���~������E��գ?>z�G/�U�bWB�X!�GLYV�?<z�2�T~�����������>w��J�G��������(k�UY<�����?���9p�8s��w���L�����f���O:7�^Qߴ�����s� N
��� �4���'�>~��.{]*��j�Ђ��j�q��Z��~� 7��B_��*�2u����g���|��!�%�C(�N]�J(���"��j�wkY�/��c�d��p,�d���>/��
!��,V��������o%+��M��v������C\D�dȗ}�rYi�yp�}���pP���J0�3h86�夽5�Δ+��V4CYv	 �ѡ[�#���q��X�K��T��}�}2��2��dQ"R����R�R�ȗ�)ǌW]"���i�;'�;��N>TQc��zؼZv��\�%�gs�{PpP�J>G�͊P��]�\��xì~D��l�9�V�N�j�0i����p��1oX�U?��/$��E�/���	�����yՖ#�SU&�w/>��RA��"�}��?��蕎�U��_�\�ȫ�(��y}v~�8�E^M/�b�%�qO�pē�F�����p�q��^�f^2�#����h"����æ|�&��+?Կ)�c/N&S/��I�r>��K�O�3����y��{��������/���DAQ!�7�Xi?1��M�n�B�
HU�糆q�K�:*�e��T-V�B��J����,W�+����O~fYM�R����ɓ�r�|�=G!gU��T�]UlN|�S��x�PM))W2˨ꆙ�X� �8@���GO��*���&2�`�F�}M�p1��Xa�*���JE�ez���j5[�<Q���� /��� �mb��ˆ�r�.��[�EY�g@�kO�r�I��I�bX6����|g�����,p���*���lj�I��87;��|QV�Ƃ���k[#��6����܍�^(��Y��v~��)">E�6��^�*
��9�6o(/n![m�$ē����	�a�#x%�U"1B.Y�(�m���L �y���%�\kYpN���-d*gO�>{z6��X��؋�h�b̽8
/M_I ��߳r&gI���L�T�P�h���L$��`�$~r���c��8���B�t����C����o_�n�bY�aJ:���w_�'���ڊ"�{��H��\b�����غ��j�x��ø�
jAF�㺄fBq(�C�����ܡ� �ByS����m�U�D�C�R]������KI�v��K6���<^fsr������L�UY�{b��e��j���v��]���|+Ee�?H�SʷÚκ�+��r��P����5q̬+!G�5STC������F��(Zvhh�Us����t�*���u��������-�*�4�����2X�c�JrE�L�|�n����Ԉk�Pu�L3y�(��*��ֺj�y$��A�ۼa��j�PY��K��A��Ch�G��^�ٓDj�%���-!9N��<�E�1`��i(����'�m;��C�7bx����Yc�q9U~>�ʏ�����8>>�/��g^2e�&�%��y�`�/9��tܯ�N�0��'|9��ixl"c/�&��O����>͒#�B������oW�T��v���25�y������e��|���	�*c�Ԇُ�{���Zd�u��� �tE5Z�f�м��J8�m��������9���ُ�"���ˮ��l��k�����ܗ��>NAz<����Y�/m�5S��f�Q�`{�gHP�rΪ��H�&o�Si#+��,K�'p��4(F�eU�Yh43#���ksb�[hch�j��o��߷��̭���c����H��B���9�"ZJN��;[����Cۉ��.ʪ? Ӡ��8���5VM'�݁�a=^���wX�Z!sW �q�	 ������}Q�#W����TU�K�l?!!�Ks�^xD+}(��e���/A\ׅ+�QX�'t��*��z��D��ȡ��ʈ���+*)f|��;p��+��]���[�kJ��-��k�ȝ-*��:O6���$�c�_5�@l/^�l����ʃ��U&��[X��5�e��@�WX?�!s��;h�|���Z.�N�f�� I��(�,f^ˉ�����$�a0���(���i̦�|O���7Eq���~ũ/��@X 0@}����lE��5'��W�eMtQ�c��/;T�Z�)#oy��WV�Xf�9��$kg��5"�y�мbΰ�W�x���iԾgP��;�6�*x��ף\���e�b�ӲZ��y��u(��G��j��ҡE]ڧfB��abpZ-vWoiݝ��/����{�*��>fNN5&�e1A܀�r}�>0��!|��B���l�R9�d{O��Q��$m�r��d�Rd�g&�J�83������<0-j��|g�RT`�z�G��\�ܒޥiټ�2�tO�V�!��.���r�90�`�����;Y)�$[����x�Ȇ�=hd(��j�ﱝ�Tɂn!�N(E�K��wʭ�8-�����Q4.�m�����ᅦKUް���0�@�tgҜR�8$��xH�����Zhܡ�JVd�r���R�m��/β�Ա&���N�m~�G� V��� ���:nr���|��R��Yz�C��;�9��5lw�i�Wn<����p@�R��D6��'b(t?{����Y �ьG��e[�摗�x�d$��q��t֯��p�8�O�o�N��Mbo��ԏ�`�&g���_�����w_����/n��}�I�˿��g_�2�/�+�}�]��}������ݳ����B�;�~������7���_���_���~=@�ʳ����G��G��p����^�"��k<͏�-N�۷8
�����[|��?�N�����~��>��X"u����\��6�û�[hFkS�G�"����x�㸘�(h��m���E�[~[Z��n���[|�� V��`��]�x����o���8^$?
��`�(ޣ�X��-�����E�}�ßQM�q�}f�CJ��/�V[�]���.��m��_�8�Tj��و��' ��i���M��U;�x�)���E������_cΊ�E����4EԐ45g@.�%ȇ!��^dO�m��$E?����*��K���Җ�����"[��1��ѷ�=��/'���
Ϗ� }hw>��Yh�<���(�b�B
���L���o�|��������I����_�ǡ��3���vˌʕ<��������H��'�u�ּ��C����a��8��P=eO�x�Z|$���Ȣ���l��u}�u��(�W�� p�Wُ��.�bՑ$؏�-v�>:"��xo���b�^�>�tOۻt�.�S�e��U�nc8�w9
^=�C�}��+��E_ >������od%�Ci�'�{�ɾmYY�a�K�Ga��&�t��y���AJ��i�{oq��=M�S�q�6?6��N�������|�8e�/��)[����g��f�D��Io/�c/��f�dQ��h���O	S����K/��S�M%�����0�;���s����:��*�����L;����94
�ڳ�Յ�F�=�:�
[t�l}��!���r��񲄖IC����5am�������Yֶ�@H���
?�,l�0���(R��]w��5#������������� �k�DI�����&"��ֺ�8xk�-�5��k�a�7o������n����1M�V
�й����T��#���6J2�*Ҭ���w�� ��	�x����{������H�Y��P����F���\)�إޫ0sa�j�%؅��H�v����zo�p�L/!P��Ġ��B��WЎzU= 6�2r��eɄ�r    A�a.g*r5���eC�K�],��
�;z�J��4�{��sA>a�֝���[�����]Zu�@<c}-�s=m����=Vc��ݏ���E���J\֐)Vz����+�!��.�3ӴCu '~++,g�It��9撁&�ȅA��T�;�͡��^�>,y���6�*�+�HR�����7�t���(��	{�hļx§�Fa:�NbD={7|1f�O��8M�0��%���)�Mf�(���O�w��1"}Yo�~ ?	Q�}�0!|U1��I����o6?I��LT��2�P�W@��j�ƪ�b�+Pj���5λ���;��;��!��J̐se^sUCIh����r3}�w���y��Lo��6o��A�.H�J���]ĕvrt��\��^�*�l�l%��6���TTS�Eͮ�wo��xf�kG�>�U�'�ĺA�KgAJr�x)������w������esHyA���eU)��e�t3���Q��©��=غ���~�V� A� ����m��͹P�M�������B��]���.	e��7�K�J]�l�����%1
a�_%��׬��
���ˈ�%��-���
b��f��������3w=�KVC�Ss������犻�?���yl`̆��h銩g���_D�%r
J���) JV�,3��R8K�.����5<��AY�LG��9�;b��\ռ�� �@B&��h��ᇸ
j���J�) (�i�ռA�_Gx�|�� ���Y
^j�(!^*$:��1�^�?,��] B���1U�H�Za��;��_�N���[I�17X�І�4�f)�͊C��:��.(]��7W����?�7��u�"[iCӦ� �bm}+����F;���T=�-���+�(hT$9f�Qe)��	���=�vρ]+���Pd
U_�gR@�v��,f�D���0��`zT�����Jf�`7r��͡�C��3k+{T!}kj�C�0�X\ڤ�� {�(�2R�p�0�U�),q_ɒ7K�x�}�co$��Y���ψ�Y���8���k5�K���;��>4�����|d�vb_�p����g�gA��4�co�O��Q�E|:�2�D2��4���p?���(�F	�x!E^H}&'�p~8��H�%򠧮��2��Y�a�F�$t����{�)˶�i�c����D�y�ʴJƯ�MId��F�9�'�&{*��4�#�R�k(�w{�?����A�\s���v� ��r���mQ�j�0�m�sC�ف��9}�t:�z6=�h�tJ.T��U�X᮫����j�f�q�yƠvp9�o됈ۅ[�QsvH�R�P%QF�.:���.2�X�E�S��.�a#ڢ\Ɍ
�.͙����H���#H��(�z�3۽'/��,����P��]:�LL(�m�Ġ�A]��o�Q͊��F�>l�YH�������8�ډ벨4WP�>9{�3��IoV�+�3{;0ϊ�,4$I��t�I�c�v�ؿ�#���Ԟ�6r&�rNZ�o4CK���b�S@��%�S�9�A��U�_DLf=���*���>QP�]Kjޜ"�%8�
��Q�9Đ�-ߛ����r��39�Q8��`�^�Gc/�F�L�d4��Ea�z�l4�{�$�z�#/f�̛��A�F"�^F7�!C���A�����n��~����k�i�@��Ww��BrE���+@��U|Ae�nHvq�y��7�X�UfBn�@�S{ڶ�)PʞUT�]�����<ft��,+1�L�=��;H�@�r�k�/@A�AD
� ����e�
2R�9���ϫ�̠��JaLnڥ��^�y2�Bq�Vر�S�XЖc��Ԝ��
��,�}�E��(�2�k�310\�袪G�N��=�|B�uP"w-��Ce��A�.Z�ߊ�Pj�;r.k���릴���.�
�PhCxk�T%���~�b�v�P���	N���9���7�f��]�<���e6'/�C�㤝M��aޠҮD�[��=�&���dE6���ESP�B��d�ȹ�w����K"�Jս-D��p^jF�=�9a���-I;vB�ʛ_��j�9�QNu�S�TGٷ?�aT�o<���Q��hZ��Ph*\� �ގ��`O��i@�D�	�R$%y�f**�׬G0�fIK��D�J8�2
�%���o�"��;�Q�AM�"��bذV�jr2f��Sڹ��O�Q0K/�q�B�<�D��0"��_���*G��W���4���l�%�t䥳hS&��֎֗,A�m�}�6��G� ����KH6Ѫк}%�h@cu���MY��?�3p���Y,\���fs����K�pd�'
�QIu�H~Zʌ�f���Up]�ⶫV��{�S2;;�k0^��yL
��LM��r��A�o��S,��W�.�U��D����Q�*�0��:DO O����o$L�k���%�ɗr��Gت_�����["��&�۽w��C'`���픦�j���\aK��pa�h���<�)W]k���l 5�M<C��t��l�]�h�̾Cd��z�����h`��P��R
�B����JR�LG�Q?��m�Ś��g��j��R>��"�  Z�V�!8?������v���+,<�
�?w�N%���=(-���xF�AbH�!2�f�R��s~ �F�UM2[4��j̥�ߑ��
*Ցd��v��)�(߉�?�ӔG"�x4�0���"�Y�F~Mfaг�)?�#/H��Fa�El�zA0��0��i�|��W���=�����%5Jd�~׈��z�T�]�E A`oi�����"�uC����aU��$�+C�"����KY/��[| �Ƣ]M����	��\��A������_�o @�[D˄��'�
%R�;̗��C�`�� �ĐB�b�Z��j�1r��eá�ڼ�?H%����^bU��4[��I5p�2���JV�Y]����^.[��\-�z��ZqA��`�e���PU���4u^;��J�w��o~Ζ�\��UF�6��o$#�D����]�L��D_Ur�y�O�����  x���0SS�|��L,o�x�g�07�#AGcfs
��C�0/$V�Y���B~ڂq�&[�?�1�O.e��O]?[�����;'�Ҕ� JRo�é��؋é��`6J��O�I��8�F<�g���/�E/���?����t:����)�s���jh㟫���I�W�6Ϭ ׬R���z,擎Y�s�ξ�f|&Wl)��&���o������}�>�]�ҐB�����묤�mG�{�Od%�A�:�J}qTWl��5C�HR$��;���t1�5���m�.�%9Ӂ]Lz��cXf]4+�d_"���Lq����:��;,�j���JΛ�[$Ā�Kj�[�t��6]�ְy_hI�P��JZ��rk� |H�q�M��C��w�ʪ.�P��}��!T�?�ke�S����*�� n{�hg$�,���B�H죤�"��":ک��XUl����!؃�FΐFbȦ���q�l�1��t�&5��%gő�am	���pY���R	'�~2�'�~2q�z�H������R�Ơ.��]��kn����tW&��P6U�=�dZR��������A_����v�.?��i쳱��T�^8�g^��"/	g1��4��i���(�`�I�����!6�r�#)l�/~E������Z%�%Th;��d��t�ԃ~��%h��2�>��g�p��V��6/N�'C��G݇8z9����GQ{[:d��n� l���y#�
څ�g�,�[��K�~x�Pt�T��2On��8]r�*2���Pa�#h�?A�I��4��0�w$P�Q�wʢU@�)$�3�L���0�����X��!��0T���/�N��b�tXD�#ѕ.����mʣ2`�G�0rIo{1�[S�Z"B�n��WmEt���uܨ��v|Q��24�Ĩ*P��	RC��W��՚��������� ���������I���I���I���;s�we�ӷ�    �a�r�iBR�����\��Y(�w��{����d��ّ�A�"��)�L
&0YţVD 1�5�TB��G1��R�T/h��`"�!�V��ُ��p���Et���?	O��BKٔc�8�ɋ}�@̆9o-R佁+���M�Y� ���� ��������S��گ�.N�쒟��^�y/[�j�A�w��6�e��=8����� �+e��m.ɆaK��{�����1e��А���{D�]���veW�)p�jW�D���;dƽj[t��g"���^���S�E<�^�r	�G>�٢�\N�=l"�p�}���g���h¦�7Yjѥ@�/�!��&�t�C�/pM�_����f[���>h\Ɩ�t��g����� dL��f��rg��.���Zhj��b�h)s֑VE>-ij���Bl(�^�^m�8٪B��u(I�.1��	�g�8K�ć�iI�H�FƠ�q,��t����.�P��hg;�	5�c�M�F���ݯmhV�*,���B�*o2�PxOK>Hg
叻<�l�=�i�[L@@� %?�VW�7�7��?7��ް��:ars��3���:a����`@��԰��23�Z�gB^��])��˹S|ءG�����I���ݙ��v��������ټ[��������W]�P����{�O.��u(�����Bݍ�0|fp�4���ȍ�������$� ��8�,������H,���{ni����T��c�O֟Û��r�CP'�9�$���}P&~�¯�zX�@�yyAV�D�J��ș�A)V��^�kYC�q��\�]�|
��&�C7�?��e���t��YC���� �F@0�夶M��t�����U���0^7����k��������������o8�DR|�Z9a����b�*�u�$p�]��n:�a��C�ןz�Jc����g���F�BN'�4��^(��cL�^_�_N��_�"�gb�MfQ�ɼx��oJG�$X�Ǉ_�	��x���g�\�$
����I`<�yK�>�/� �׵��� �!�l�y�����Y�k�Ej�-�:��*�v����m�'X�9@��N&J��x���Ĺ�㗝4��M���#'U��P%��n
ş�
ꩁ���ي�G5�$/�\�k#�*�sME܃�z	�
�6��O�&V��kd�����zE_C��쩸��%�-rvk�`�]8z��ٙ䧘ܴϥ]�r6E�r�M��l�:'mE�#S?}1
{�Z؈�"d�7'�7�x�E9�R'a2
&�Yt�\B�'Haَ�0���"���.:D�����{�堶r�U�7?#�P���O�=Ѐ2^b��Q?c�JQk>�'�۟�Z���+$ �$NB�7ʚ�E�Ϗ�Hⲡ�Ā銷�nH	1�6��ŝĭuɩ�<y��}�o�dGk�9Ŗf���b�*���0�����f]`�e4���+h�eȌJ@th��Rp������BK�t'`F0l��Nu�5��]��a.��M�PT|�cgHOAL�z�1o�,V��� uqf�f��[׶�V�*�L���3�#Y�|dxd��?���ΓW5dd��r�3�`�!��x�_�G�,d��q�Y=��e�Лd�WV|_�NH�r�Tbв ��
����Q����Y�V�|�b9�i����7j]����x��߶fs*9�� j�N$Hf�{���]��y灣�x*|�/S�y�p~�g�s�z�ix�8^�1��l����h�,�c6���MR������l&��k��p���� glg��z>gX��
�1�b��Lܡ�We!���5�H����ɘ�l��:�R6P��װL���ݽ0l���Rm��	潖�@΁[A9��k��ݎ�����&χqǟ�>�%"Аl.��+jn	�0p$g}�W�/'[~����[g�[�/�*�^��ə��>H�ul�!q��~7 �E]�I��τ�C��C�j�u��t_�2욑� ��|���C�"#4!6���Z˛
�>�o�*�C
�*��Q�Uo���[�H�z����Mn��C��#4�D��w\�̗�z����5�(��.Y�b�OC .�Rߚ��6�M�:4}���-�C�CV@"��X�|:6���XH��C�C�Z��* ]�뮇9:�:��Za��++&#\i��c���EW%Y϶띺t
j0BEȮ�y�%���F��'�s�yn����S��nZ��h2xUAtG�.����1V�8��zK��3v~7c��ţ�gg��$��/�d�c/O'^��So���D�?�&�u�����c�����^짩��d3�+f<=x��3�}�Șg�s.���}�K�E�j��0��mW#�U�ۯA���a)�s�Fb��g��u�I�a��u	����}�gIY�+�ҩ^sst�*�*�ժ˜	j�큼����ג+w��_����Pp�a�e�f����5�5ò*y�@�f�͝8��U �@ʠؖ�!��p���eA3���?W��fo�j��A����.�5���é�����=��|��$��<S5�=��ԡ$�����;*�ӧRO�;v*�-�B�0��zal���9�|�ә��'�x<�F����)��ğ%�c)d(�Y�tf8�b1�O�X�P <&�țN&�,%i8<�	mu��4"��w��$����a��Ö����������Gkt1s%$����6o
l�;�~��7�_1��SQ곎o[ɪR�+�=���ǖ����]#��%���&S�������C��_�<A�.j�!ˠ�Dr�-?XU,a�$N��u����._a �X��We53}ۨժ�.&GB!6��$j��^��}�i-PDBr��1wv� ���j��`3a�5P��вjd�y��@-�(��w���.�$�c��?8��Re�п�M�
qġ>���wס-�M䜚#�r��@���#�2⚒����ے ����I�T�v��]��H�dlq�#�/�nP��.fH�.�PY�8by�KC���A�X5?�eV���l$�g��+Ax��v�Z�С 2:�u�y҂�J�WN�Mw��{����憻�[e�99Pk���2*}��e��e��]m"-6�y�e�Ij�P[BO䬚�������'I��t�&���޷�@�,�4ڎ��;?�eߕ�"r�!M{l+ԟU�b^���M���p�r��lI���!�����ٲ�P��_eB�}�]���"����P����}W��^��Uk"vG���Cq��1"���J;�]AD�փA�΢�5���!�9�&���S���� S��<Bl�|�V����K�`	3B���|��2���x>��%�!5o��
Q�J�����K"���xFh���a֚�0�jER,3V���b�ʍ�}
�o�l�s����s� �a���c��9�e�_h=�)�H} G�� ~ͼ�W�h��e=;|b�j��,#�w�4���0!�()nރ)H�0���x�Q�NU��aM�k0�T��sG� �����8����M:7������(!�X��O�찂��6����PD�xT`�\���!��d�F��W&���V���҆H�̶�k���9��^�js�ר��a��Vj��0��=6h� ��S���?��ȰB�&ǰ�/��쮻�%d���i=$	�ql��VۭnuC�}��v�uW�!�����"���js��j!k_��&��C+5#g����XX�r�ͮ��G� 7��`�* %!�6|0XC�PO^3A���ބ���`���84{�`��Go[?��&��-��(#.&��F�Φ#���țL'�`"f�臂0ND:����I�Ec��c)�`<N"�N����>G�*���#"<}�#d����E��+���X<7[Xg�ᙦ���:\~%���`�'?��O=iy��5��X�m-o �D�Ӈ����S󹕬�oD2��1�+,��Y�6?!l�*�ॠ���Ki#���g��Ѐ6���C�֠x�0��%#�q:r`du�����,��3�n�̄"��ﾞoE^����<6�b%畬YEN    O\�f�KC�\Z��+$mܮ��P^���Aij�H
,�,�.�Q�-ݶe�9���C�OI��t8�k�%�\���<P����{
��s4�fm�)�ml�B�gI{IE��jc{܈C]Jd�c�6��4B�U���t�jH�!��C}���!��rR�!�?����p��j�3�w��	�(�
��<Ծ���0G��7��%+e�U#A�._Ua�
F>p� 6��;.и�M+�K�FR��eS%X�KhG�(�f�V�ӌ�
O��T��Ӣ#����T��DA~����,{0�z��	"GD�]׫}�^����1���h�IƘ����i�zBF�4|$Þ�|S9�����&��K�(�7fI*Y����]�Ѥ^�B��0"�]<�N�$��)}C,�+Б6��u�R��ӪY����4���m�G����n�+b��,��3.+�*p�����[g5�<�*���O�M`����P�E3�7���P_B	BG`�3�J�B�,�X���W�6o�(�A�0�$/i�[�������o�>�B^��� u�ێ��Ps"�k�&C_˶�I���˃!5�ܰ�\n�RDY������eU�sޏ��{[)+N:&�ʼa�{���6Q���J�i#�,-�ND�nNFmM���1-.7Us�۳�j��f� �$I�F[��C��DZ0zD׾�Š�A,�5+ڍ��M-�٥3X�\v%8 �:E������T�[�	�*o.����ߐ�`ƃm� ���Єr#��_����:�|q�[HOwEjd����2@�9��gTX�>����Th�tDx@5�6$��zk�����L�U8�3X��`B�x���6����LB� e�K��T���-q��a�����k��m��3	&m՟�5#�
��� mh��/���I~b6'�����(�z�x&�4d��g��|ܯd��t��<�O���8տI
��T��`,�Eo y�J�.�N�KW2����W߃�-�;qH#�� gg�Y\j�=�n�'t)�e�yK�r����+�sG2�p�raU��P����a�ozQ�STs(�Q7i��vb����YۻK��hnX�s3g%0n!'檃A�K��T�}D�2���P`�8Tfmi���P>����v�OVl�7�o�{ =)�\%���*����h�9�*
]�Jv/j )� Ɠ��֪!��Գ�մ��í�v"/Pyo�3B�kf����Q:-� ��}ː�)cp"��$�b�����(ʊ��5��ݯm��^Q������jJ +S: �r>t�ғ5�t�=jً���F���Y�S��DGg���w/K�)U�䕝�Д�ً9z�w��f��ͳG�Ϟ�M}ɦ�{B���1�^�ߛ�� �c�F�_�F	�O��F��K�,�&,��1�M���� Ku�䩫���m�~���	�	E�����ު ;��>��sn~H�U��yEi�>���)����H���zl�Vr�M�_5A�����z�a�l�M�P�䕳- ����̢�hGȐ;���Z�#*̵LS$EGGy�` S�xy�,�96�P@��v�f˖�Y�<'�g��q�WФY�'�9�P�Sy�~\ Y28���1D1�XH��zD\�낍,�"`��f6q�$k� 3�XΥv�+�A���7��	4�+�R�G��;E��"��[�e,DG>�j��ɚ� �Dty;��n+�Pe��~Yf,7A~>�"9�t�b� t8z�;��UWYFEf��|�8Dq���*D@d;U�)��+I�,_�s(�U��25�/m0<�F�U`�U��ƃm�8"�B��x*Gq�{~�H/��ȋ�I���0��H���_�c4J&<e�Kyȼ����$���ф�A:�G����\��"�Р�Sb� 8��Q$Υ�7�3��g
�'RVξ���� �j��=f��L� �?��A��E���2�+���^�IPW+
\�Y�}lv�5�"`R����H�,3��~�>�����~_c1���jT�ZEu�?�+����E�.�,�<�ˤ�!�������B�y�w���@SP�H�����#w:
%=U�����uóW�@ơ'����EV�P1`��C�ne�a��k������GqY�l�[XD ��9I.���P�α�����3�*�Y�؃�+H�Y6���p��*R`R�&�gP�ي&�Q��*߀Yl2b�*x��X��cOgA}o�"Ŭc�V(ر��Y�3���b%�e���"�) ԃL�	��qVc-U�Y}$Z����v6o+� �A\�5�l�u��}���?�ʊC�m�e��m�~�>�M�����)��?�RO�c>���ms����ou���I����b<���G�`t�:64�j��s���^ ����)V�̪�s_�8
v�����a�^�K}�Z5�$�|�h ����
\r
�	����|�L��=ēfBm�C��X��]��Z͡�����:��U�ak�(�e�N�M#=�D�Ύ'#�L���=��iʞ��y��T�DS�GQ�k����fP���Ԝ����[v4]X�n��N:��R
��9xi6��h���Q��PB�3H B��4JjGΝ�?^ ���<������)�>�˄
� ��,���b7�l[�x�J7ˍ��t��B�4��)6G�X{���F��B���`u{��pb��U%붴�yG5��F,EY�0ؿ��?<�~���&7���F>��hLU�Rz�}��$�; �X�%�B���J��"�}���D�24���\�
�?��{��k��x��]r������86,y��4V�g����J��Z�F�S�?XA"�
�;�n`�E����#_*f#��L�u�2���������3/��x&=�Q��h*�Ӟ��I0A:ѿ)`^8�/9��S��Eb��گz��I�rܧ���yO2�L	C8)-��ܟ�!�+9�dM5/�7$xX����t��؞(��H�>��+/��~�TE�d~�L(n@8���R%��EzXpdE�vTSѬ�5������Df��q��߽T�,�/sS�x�yW����|iP&�*h �����dv��)��R�E%�U���:�-�)I�����������X)�ɗ�-�c����"ס�!�`�I�b��qJȔ��X��mq���ٛu;@:��f$Fg���:���n���k>�n���#�c�i�P�HG~���J.e���d���5���~_H�J�0k`��
@��T�"�i���uCfJ:e�z{y�ѿ��*�r�Y��&��x�A/��С[݁��\V ��i�/��Q�ζ�p�S�afU����*�PK�J�~_M�d	�;G��� &���{�l��YN�"O�ϰ�ex�"<>	�H
o:
���K�1�d�&��bڳ;���M&i�r4��d�xш'3?�"�g�����.A�O#|�j?BW��h0L_���fY
�2	��P�+W��?<�Pˢ\)������n���ꠊc{�qT}3�maS����)�|�b1(V�WQ� ��\X�Ra�ơGA��{a�0�S�0�KVI�Pli��dH�P��(TI���y�-�n��3�RԲY?PD�3~C��u���q/2�o����Bz��y
-�0�u�e��%����1����W���v�������RR{�?T*�,iP�gMU�:|���E�.0s�ڽBxqQ��\�΁4Y�6s��Wd����[*��E�L�]g*Ҿ�/���
A�6�� �a�Ų��em;#@��f�AY֬j����":ĳ&aP�*��=w)��i��[�	.���?վ�Ӏ���+���_gC��~�jEͩt@�#�S�#ࢡxx��5����^�ހّr�d��-�Qkq�mN]Z�! ,Zɬ(��o0� �>�m?!�ع?�P=g���Z��\p�(���ʗ����;(���[̉$��{KuCc�t������Z��M�l�zƝ��@U�g;|�USQ)4���S�oO}�����`?uώ:V�Y9�
��
X��    Ob$�7fr�b6��8d�ԏ��8��q2��8
�Q�ƞ'#/�%c����M�ȏg�K1��aHa>�Na�r�W�)Ҟ�l�D���F}�7LEcs90� �c�˲Z����a�{ɱ��X4�\�ڿ���K�}�WP� ��b6Z������2����O꺙C�KX�'WȽ���]2�VB��qCC�Y?8c�v�Uh4��U�/�4�����J��9�d����{-�u�XYJߤ�Ծ:����(.q�t@AM6v��t-n�Yk`6�
��"-+�a�PP�ɲ����3f�	kG�pL��M�B���]&i�q�,�ݐk��$qd��!�}�f�F�WRŚM��N����>��.�1.�}��O�L4�ԧZ��&�V�M�*lR	��JVT/r�yt�Q�$�I�ī/��A��	 �N_*$jЍ�qeF��7F��)����,-�!�](�KrZ��wW2�=�=D�=3�Ѐ�} �^�yC5���Om������B����fԺ5��!�,o6?I����Q%îh��#�M��'JR��|�GB��(;l.�d��BG�ڙ�j�v�Yyi���t)k��ժ)�0-þ���=�|��C��eM�h$h��h.����d}�iig�g�Șž~���Aԇ"$��@�2X�Il����9P�P�7.�-*Ioi1�P����ΜΪ���(��� �åh(�Y��՛��\��{W����6?a����h�ݸϲ�j3��6n�y�������N=�wO�z,a�c���1�ɣ�gO�F,A�G^4�&�ų`����N��D�߳1�O�x�"o�&��|�%�$�_JM�������М2~�k@��@5�v�b{���b�Y%h����J�GW�4涔�ņ��O�!y089��Wΐ��Xs��`	����Z�1�:��H+Ffn,�>B�3�� )��	:8�{���������#�l1�!?�1��������*�yG����ݕW����Sc�!ݼ�*3\�)xsMj9o���} m1,u�Z�:�<T~вY�3�SK^I2%���ح-���`-�[�ݒ��FQYsY�c/�V=����z�U��.�x��M��R�������Jaݶ\@���{.��Ʋ&p���߲��][I'>�|$ޙ�������MA����1x��l�d��� �d&ȣ/Y���U�lqe��-K�C����*fv�S3K�eEL%�� G]��l��n-��/I�.�O��KQB��K�M�}�Ƌ�V�t%��b`c��a�č9}�&� ��*l0����Vb=�ؼ��ܺ��Aޮ�ֲn��j}K(��Ǭ�B����Ƃ�d��֚�7�Z��τ*9I�ifٗM�n��˕dw�5V��n�Ѡ1[�T��L+��/���L�<Uː��ΏB:CM��h����҃ j��!{���mn� � �8W�*'�ic����bE/?3�6��ƃu�l�Y��3Co�%,�KP"�լ*��v�*�spz �F<��t6�R&}/�N��D,<�c9�D0�'�Ӏq&����GLxQ8J�$��iN�������+���Bv�6�D���	�$b���0}�M�a�2��ј"֖^b�ۂwh�f�RA˱1()Ա��9h�M�����ٟ��^�v/0"0�-\��
��B�K�2�n���c�� H�f�,��ǐ�p��l�*c�a�a�f@1hj��{rq~7.�)�Vԛ�6��?_	��+�>w3F���S�I6's��+��@0�L�.���)Hv����`Y���:�5����`�y�fYN�϶��y�
 �>�cwN-߼ϗ�6��zWl�h�)@ծ�Ȑ3��k��+$�m���}��j�J��`��KE��{@��u��I쬋ݢ�7$T�	^�TPY�CbL��R�պ#�n58��*B<UN����hx"�=��)<A��,�n���,��|��$�%�y�q{a�D^2��O�Y,�$˞\B��$�/��3/���cl��ψG�����mu�|]���_lj$w��WCl�9$�Pʠ�?@+÷���������5���B0����F�Ċ[]�J�@��Y��9B����u�I�-A�Dp7&��7o�x:��/ԁ�i��r������\�A"gj�S�-֐�svy�)0r@56h}���Jp�@`e���y��~�?.-o�nW"��h���bs�����V
�k�3jH3���x� �]62trA9˪���\%�"#J<��3��]#ᕉC��{)1d!lQ=��Rsu���Ŕ*!���!£�yC����ǵ3[]b�*D�c���yYV底N
$�����_J���Khsdծٷ	u_��0;�roɖA��\�9��Hg��w$_Rk�v��,	�N
YKJc���YQ�Cn��	��.��$Z�)�ا���8[
?a5����r�	�W�6]~+�el{��+�t�t�l-�����2Eɡ�/����?��mQ��kh0	ѓS��h�m*��������Eq�9��"�,��#�Y��6nt��˫����˩^�ˣр@��p۔�ʪ"��LvW︪��yE⍲�7=t��):���7.�a�"7���hS�Ƕ����Sۥ��ٻ"�����#�Z���iEe��!���7��V&%�#�� ��-����Zi(@�=΂�ɢH̡��/Xf�F|	w9�6�&�=��>���5��#E�Wɢiצ�rj1�k�̈́z�rpx/� �f�9k�y0��L�KY�(O���w��#�������n�M�TնvJ��{����2���	�dه���Z������C�|Ȥa�1%!�*�x��.��F�@l��=�{I*C��H3ta���w�@����s	��@��;bcsö?��e���#�Cɼ����O�:�A��9�縀�Q�}�i(��5���v"�y(�q;���,��l:3o<���PL��&S��Q:�N��I��~c��$�LBν0��?�)���{,�A¸L�<8 ��简���9�?��C�j�P �AN��WP�������Q��,�W'w8�m�/٤gv`���6 T´�x��
&h~�$�bU�yb�W��j��}r�Y��v��/,�k`͟�q�����3KN��^��"��#l��N#�Qh�CeM���[��êR���\����^�]8n{�ƺ����f�aI��&�8"Ջ�"��\%�&�t����vu<J��i?2r����<:P /�� A�5�d��\H��Z�P�&�d́{ޮa�C!����?�+�7[Q��;7�]�Uܰ�<iw�M:*= Bh�B�E�B��vHJNּ�Q����/�@�RV#��kC$�����H�����{�2^.J�o�L���h�'ѿ9��I�d"ə�'�{��+X�+wzK#x�ma)+r���-�
�*�m,H�{G ¾D��k2/�)�f���i�+n�ɲw��K�<U�4w���Ft��2y�?18�U�?[c?j�CJ��n�WP���j��k^�j������ ��2�k3�]9�<�I��W����� �Ej�2�o�H߈�PT�z����lƂY�B����e:��ɘ{\2��4J�Iϒz0ɘ��3)�p6�XNB/�Ӊ�0􅭒���l�N?q>��-R���)�C�eC	"���������=�+�vVt{�*�U�J���ad��R��Z����kh�^m~�f�uu��=���]ER�[�Jj"��JU�yk��كW�`��¤m	�.�͓���P�	88L�3{X�B�`sf�R���#��G�Rn;�"Qk̗ ��(d��M&)���ѹ���r��>U�$	~rp������)�!�ft!�Ǐ=�C�����UD�#h� ^=Lv�,jˢ�-W��c8Wȭm�f���2w:2�5#�Sw���~t�gG�����o�0��i�ZٓF�~�����M�7d����s�d�s�@ۡCbOA�P���b����e;��5�߀0?���l���A�h��|

��^�]���x�z�h$���/����S��N��T����h��o�	��C^$�Q&��RA�    ���[߻��ٝ7�������\ڼ��l�ض8����*k�C���)C4�����\+n�3� L0gl��'%���{(-)��'�%������#$���·w˨���ȝ�sm��l0��.Y�M���K(�i���zlռq��
�cNAX6Z^��6�w���q6�ᶷag|��(lL������J���33Շ�d��_5���ٚ��0�֦�Ɠ4�h�k�\2A�&���W��<WKl-t9�������vJ��rן�/+I����kb�p��d�������^Sy�A�}��Zv�����­��5����PНm٪Cp�hAKK�7k��56.˱�nt#�ed_����)�ଆz�!��6^r�frV�q����e�(#i�����\;�S��Ɔ9��G�RRDK�3O��I:��y�OGID�П�+KM?'���I��xq�$�%3?��y����t����_��D�4���_�5��%JjZ�x,mTN=�Y^+cd��2BbE^BG�?�sFR�x��)Vn9�S���-Y��^�͓�˲Z1���@����slMUl�X��p�^�@7T�����H��#�%�f�`�ЂQ#�f^���.�@E ��kY0Uun~�V����h[�U�v�	gE��[N�Q�P{��vD�w����Y���th��*�����������fP�,
N��:b`FҝG�;
�y%B^o�;r�1m���8̸�k�ؚd.��t5�3i>;�o�8�P�&T����L<�(��L��hU��Rl�V��ҀzA܈�3�����P����g�vn�"�i���!�M�]�q�~�Y	�t(=�/'�T��i�����4�+�s-o�pa��0 +��E�Ѯ_�ĺK��]�Q)Va:C���v���δ�6 Mې�7�j�~���]��P�|���ٳ�t:���Dx�d:�?��(�� Ny�c.z��E锅����p��I/�r�M�!1N��E��(�YTx�lC&�v{�ӻg\Q�o�]*�|�aZ�[��`��A��M�Tϣ������_ڐrAc|.�Aw|yl�?���̎�������I^N��Y��d�{����`���J�㷝vؙ�91��WC����M�0dfl'�,�!JJfZ���8S����-����|��6)s���S�x
?� �d�72�]��Wv�&��%I4�#/�/��Л��h�3G�Q���$�M��{I0�^������x,e8�x��9�ܔq��#�j���N�AYll���%o�T{�yYl=��|�C���&u���!d����=[0�A$Rw�x�;�F�Y�F���[�U�>��z7��%$˓v�36�c-hꎸo�F�t�,�5ݾ��\g�� P�>6ǃ��rKh"�E���J+u�XE/�2���!Al�����]B��f6e�>4-�ID2��,Vʉ+�bs�Kr	�mc��nY�2sT	B�P�G��U�B��[������i;܊*WE߱��w�5�ʐiK+���I [A�Z�5������QRũ�3�}������C!��VeM�E��e>[��+�����xM���!4�P� �u����⯎�&�ʷ]G��j�箮N��Ҙ�$�
E̊;��!�{V��Ğ��ʢ�g�A����{��ގ���V����
Z0W��� 5$�H���v��vky	d|XHt*��z�x���h3�գ�gWg)��q�^�G�&r��i�x���q<�� ��kF�� B����I�x�8{�X0��H����.r�{�)"�D$�����/8L�����j���H�g���������UA'%g�
��Ț�
�X��R��ޟ�}��@�*���S�O���P�1]{0�P�!�\{�5�	�AF�u��hT�9��O�?���PA*FD�e)��維�; �4O�Ds[	��j�>��*�C�r^@ ��>@�@���D���R���%�����n�Z�ȋƃ�P؏�Ç�'�N�����P5������ nP���Jы*�)�뫊��+E�N��_�%�4�*�-�P��LjY+�˂�p2R���'������ �9���'��F���.s<� ��F$�^���2f#k;�&��<H����S�=���-:���d_7f�w���K6�]���Sq����ټ���|?��$��d�ϼ0�������8�e�ȸga���ϥ߮�
c/�%��fcoă�M'"J����)wq�<	a���^�[r�xf))��8a�}E
L���P��e:^ڮ�'U��j�h���љ�Trl���as4��Av� �+�jD_'vح#�!���Ȩ
S�@�ܵ�v��=��l:	�c��:4�u��'��*B�DmG�h�R�*�r�0ɠ!���L�HN.��ze��d�B?�yr;^IؼaŪ?Q>�l����K���Z]g<E')6��2��(������߭���w���m��!m�}W���l� k%ش���+���:Rs��(G���ݶ{K�����9o"��j�lM:ThȾ'��6Π��EI�B�Z� � XUl��{��a�B��f���l������2WGF�U�6�'[D/T�][7P9#=�[���Jͺ�Vc���V�~���^c�3��S���OegeCeN������$LR�O��E��$����zm--�T�\���1�x&o��Fi�%>����(���e;|e������^a��Ky;L�/��/t�:�:�́'�p�&ev��|`�ؤ��$�U�����n��.oaK����yaP�I�E3��B����(�+�Y�,2_u��%Y���ø�J/Ӹ��*�j�l!_ݪ 1�h
�l��V�%���q�$���Z�D�p��U�U
�a�Ʈ+v������N��e���u_ռ�,���Vm_!TL((c\�yC]w���� ��4
���;'6Kh��ץ��qg@Ĳ^U���
ubƌS:��I�v������"6-d����3����c�)�"�������^�
Y>��T��v�
� 1�w�0(Nݼ)搲%���C[��4̞���z�y_@�Ѭ��͛?��h�(���\0��N�^c����v��^�#��E�Z����}D��.oY`F
[�^�֧c4x�����1��6o�Q?�<Z~����� �:tC�CF9X��T���Щp���v=ogh��t���x�z�H��G^2o&E<f�M�iЯRq?O<�Lb/��i\�{AN�r�L���3���B���!�u��r͉;����M:�����ǣX�^AB�˦MT ���}��W9Y�����)��,B~y���~�$HW��e�J��R�et\�����l�R�\��$@Dʹ Q߼��[i N�`�Xǯ�a�tY���c�R|</I�|+��b��2�����A�w�%��	�_�TJ޶B|I������L �@TF�0��/����f�2S7)Lt��dQ3�ً��&3gba��^���� R���i�9�	��z����I鲠���Ow�߲ҡP>���@��=`VY��� �~��y�(�/��*#AȺ$�@\�T �H ���,��>�J�h�]���a�0i#������c��'=~��'=~ =��)�W ��h�r��C-#�3��I���K#�L���!܌ǝjտ9s�U��6��5�ސ	(�o �Kc��w!L�Y�P�?f7�
`���*�A�<�ye�S�_ی;�Ta�� �_�%4 �W��Sw�I2pgN�s��m/"d� �RkYQ��+�b��y��ʼ�Bap&��~y��HɋmMp�ba#���[�U�j�tW�Ŗ���Z6�/��
��L�����Z��ub���ХX���}K7: *K���
2�qt��˾X���Y�E���g��g�ǡ?��^<S/����D2�F�h�X4��7G!�h�G���(�p�^�'қ��пq��(<��w�L��    ����%Bo$�u|���e��P�|�
�d����N��[��:�Λ��'f{(�96\7gX�5�mz�,)���3�N�ql	lYa��SՎ6 W��d˒�uKbXK�C�XТ��Vvۤ��&����ˆ�Ib[	}ˠqhئ,$�l��kM|t�6g�,�P2æ�d��gq��X0��v�%��^!���L������d�571���Z)\�5.j�6L�mQ�	4��7��`YNcRu�pl�љ��b�Aݠk��z{�<Cf�dId���f:16^i��;ô]�@�����e����+Y��֕-�Ċ�P�9�sz��CٹF� �:W�o�����Ύ_A�.��sY�A�_v���&�ׅә��ؾ�϶��&���sV$��}kl��+���R|*'�B\4���1�U������:���3T���C��'��������7X�N^6IS%���d���� ��,7/��g�M�v2�K��\�3����/ř���b����L��5=�hky���i?�.�Y�6�u�s��Q�:��Qnw S/�2/�Dxz�h�2dXs�)�4�Tf�Ou�SĘ���$���d�F��᪠�NW
M�W�2
�2'w_U�^�2��x��)c�����\Vٰ� �nlޑ�5Щ�q*ft(p�Ō]�nS�`��&�)�8q�?�R�iH�8�m�8��N��E��Tʈy�T/�����d�Me�p��d�~G��E�&̛�x䅁/�ocO�i��T����'��h?­�z"��@��|I���"��L+��W��$t[��*ր�x���}��=�P�"G�`ޯ�J.g=� P� ̟�����t.T�Zl޹b}QbKMdkRz�<4�_6-�<�vt��ذf���T,U�����;	����L�ԘV��
Z�����Lߞ��}�E!hr�Yn���aEx��r��Q����gH�sVC�P�H�J���f�,T޷�e )��׋f� �΍���e&@�r	%o��ܳ�����r�ĥT+�� �1�o���1Z���,3
UH����2�]]��f�v'��FB�f��f�*��&�~��$(��L��0�3�?CT�:__�U'��!C�c�����L��!��:�t��ݟ@��I�A@wOT�_�@�!(����
���j
r8 <��o_�x�$,+���:��g$J��&��^�"��m<��1�[���=cs躠�Ϊ� 6�;��*l �ڂ����	s@y��`��ڼY����p[mg�3����Ƹt�/�����V���^�==�ñ�9{r<j�<�ȋ&~���d��ď��_���C��?�?�^�Ϙ�Hx��,�8���?x��?\<�g���̏�uIЩ�?+'����X��Fm�bc'�\Ԭڼ��c����fL���/���čir�"����I��׬RPY�B�����}�,��59ˍ-٪jzC�u�!�dd9���[<bV�Pi�<���<x0�R�v �&/���Z�`�qk�n��zo�����a�̴�t�5�K��y7M�G&2Hs�+���:6���c�ް�A8�VF� Zxe��ӊ�	lQ�8%��2ű�v	9��Z��pS��cD_�Q?�"�D�A��a�$�h`_1K�6�s�N�h!���z��bV\K(+WM=�n�s�Y�/��)P� *Fa�ps��]�b��E6oZ��lpu\f	�d���pT-���vE��~��s��ZJ�TW%�[���K�V}��)���Y��i�j�P�x�$	jf��O}����W@�����w��wT�B%����!�;l�F�Kg%�]�+�:8���:C�	�ŵD���r�7	Ze�Pj@�Dj�����g��oYi��P��*j�M�B-TO�FWr��ǹv�ؐa�@H0Z���l������і_BY�֛�[��|=3��g�7bhS�����?�?�%3�K��^��b/�7	}?�&���d<����g"�p<�=&���ԟ�D��Dz�fU;��B��΁3����|KH�ɝe]S=���b�8�Aٔ5��:!������l%�� �]���TݗP�R9� �zۑ�/��v�<��C�}���BA����zW�^�~�M����`*إ�@���0ା�u�-�Ğe��zl�8ؕ��܍�)���m�3[)h�t-�Maf���kg8i�P���x���%�B;|߭��_�쏁V1�C_�ud.(JZ��P�M�:ܰZAc��pG�0�U�F���k7�1�7�;Uia_�װфWdFk��o�m�
i�=`;A)}�I0%u����ӵa�v0P�ؼw�8�r#��%�^�6
�EK�����^�Q�X���k!���h�X�i���\7\��lA��9�{s�y;��_����uYA�#�y{͠��v����¶�`7@�X���!�ZHdk%��%2������e�LK �C���]�A�5�ӄ8ܨ_���Z����3���B;���V �?�n6���d�����7gDYU�GG�*aQ��aH�o3y�Q�u(J�\�
������{��.TF�o�Q��hh���nLyjY��̩e�y�⼝z�~�S���y9�p�Y�w�Գ��=�z����؈S�����ii�������ю�k�""2�={����f��1O�ya<
<L&�(�r6�ñ��Ga�x�"^8
������t��9����C@�!�pu�ܳ�wh�39��7����^B�O��,�C�劚���{��䐕��Z�$�݃��]S�d3�ɟ��Q����l|>�w�5�l�Y��w��M �,��[�sDd�JN�9n��l^�V��7��D!ǈ�"r�V�O�&l�=�0,ѿ�+�����Y-�A��j:2���/ࢄ��6op�D����m�fc
9%�v��BJ/���*Xbp�w���;��@{��L���<���bEUv;-*&�kh8kl((G���~q/ +�t����P%u�,�X'{��zc�Yp�!�ķ��;D�F�=��R
UQ��?Wn~"���d��o�\z�6�<��|���@J�V����E��;�0�b�(�Ç\�Ic�a��"� ���/6,9L�S$�#U-'���%�9u���Oơ���-~��HW�Ae������(A���4��=��y_3�X��ʬ��)r֒�;�W�b^Y	m[g:�d�۝E��K[�r���}��0|Hb�"e
�66��/'�>�5WFkc�h��O��9������P*��-��5j�Z��D����v��%����D4Զi��$��#��Iah�C2 J�FG��nd�Ψ�0p�xi����ٵ�f=�?����j(�G3O���W�LǾ'�/��|����۬G(GA0���Se _��&�Q��4���z���Z���#�%����L�n���XE����uGW��tW��"�=Cu������N�w�U�����]���q/�詵@�T��%�JD,JDe+)�#�1z*?D�焅(�1�H�p��,�~�
�V9�ڷ*�zA�i�_�W��Tܩ0:y�b����Wy���՝3ε(!:FĻ(�0ٿ%����J���y7��YY��
��_�9\��H����z%�ީ;�yڰ��#���ɻ��К��~�J�D""^����c��k��V��7T~�ViHz�ǧ����k�����\';�F(��T��U�栂r"%���$/r4��U^�Jr_�.l���	�̢��"���4�>�^m��@�M6az*��������P�*Dy�Q�U���M�&gO�W��(;��9����J6,�w��CP�Hӧ ���|\Q�"�3֮\��)[����a���:��u�jN��j�c��(�뎁�^&�Wȱ�y`�Eߥ�[Gc��!:�C���"�[\�O�ֺ�5���13ǱE!`�����kR��r�m����
~�f����+ ��ӎ6�5�+3�����j&�b�l�a���ca��lu�0sOq�a̸Qy�l��"�
�u���%����4f+��e��    6�f�$��Y�����=�U���,��͓׿�PR���о���Ľ3;;��v��lR0둙���u"��%i�*5d=��?t�;��N�����Ԫb+�\��F��R <>T���X��0��٨��d��v���B�%;cB��~�9}�Xe;8�~��]�f��ى��9L�ՃLJ[%h4��������)�w��K�l8�B�ݛ��F幫@�-�թvI�Y �X���D���lr[�[&���}�Ͷ�}z�|{U�z.�?-�^8����[�`�E�@�"�g2�S?S�h�f�S~����t�r��憈a1R��t���	Ϟ��H;2���
9W!�*,b�s�@QO�K6��'�g��-�t�R
���֠�9�q�5�~:���_$���S���u��*-�{���/6��f&/n�d��R���4��_��8Dwd�~���?��Ȑ�Gy�VRXw�Z1*3Gɭ;������=�߱��T�bM����[�ו0���M��$�Җh�'�Cd�ǵ.t4�Dw��Y}��7�r::��Ն�b��zV��[�:�{���a��د�
j:|�0��f)��9"N/���T��j�x��2��l�e EW$�A4�ͮ�7۩Ī�s���J�Jkf��L�J�B׾u��6�W��+�F��p5�Y��	�K�1��L
ݼG�G�E�F�銯sF�$�Zo�lS��h �l���$�T��8Q��E�K"�y_�֢�-��Yq���\B������h4Z�	z�Ҍ���ut�o5N���96�H��l���i��}]�Uj6	rG��[XDu�*w�fT����`�h-A�sq���Pk%Rg��(�K��ȋ�n�0�f�znq�Fi+�˰:��D��	�:/�}-wfh�xe�4Jp�Y�B�4uG8騛����o(����5�e�ay7ϊl��ŏh���"�(O�:�^?���pc�-�tW_�9��C�顸��Ӊ��Ɯ��z(]c��Aea(��5��H�0�5y=xngW�[�ҩw[8(2D!�L,�RKi����G[kk��ճ'W�DDs���ty~���r.<G�,���l*��.��RƓ�ǋ�����q��\��E�pE��?*���VD�E�JZ'/�jտ'E�Ne�[3Y����N3�}a[l��Ȣ�L?A�V+�]G�v4�=����X\�U}����d��L�	�1��J�,=��'�gI�:k���TՖ@6G�F�X[8���QŏL�Z�
1C.Nr���YU�����r�i�M����0�#)�25j��	vT������Bddf��B���io�4�����IU�\}�W����eSt���h�@�8�����k'���3����N��D�|E4�FjT�+qN��BU�,a��Q"���f{���{�1	rm�. ��(�U�Sֵܫ�:�*��=$�]�#��W�
M�	�&���V�}��L���g����BT0JBW�/�"�!�"VeyuM}����r�52S���p���/�@D�Xú��WJ��ӻ^����h���� �a�orF�)2Du��?ϷYlb�(��*B^�/���GF�l&�*�$JH��d���Z�.�`{\�#�E���&�b��k(
�ṳ]и`�������������)E�t���"��G7����-��L��OhϜ�9�Q��.3�"��*C�t����Eb�Q�sS��孆;̇��a���=����2ł����(օ&�*d��m����t��R+�ԊOx��Z�V|��$o�Ԋq���:#��5��0U'B�	0�OI��#*0���.�l�.A;M��R���W��o�5�2;lG�<%�=��C�����x�5T�P�e���"6:]Y"��m��e�X�g�1��V�h��Ū���=��$c)D�tFe�' ����P�nq4��ds��p�S�W��P�)�K���A7����hQ�p��2^j��Zb�]j��Z⥖x�%�<�:��� &���o�^^�f�`���X.��/g�D�Лųe(�l1ϻA	�������_�#ϟ�������F��3��,\>>G&x����<�ߓs�sѸ҆��&���E��]"��*;��Tg'!dQn�,t7�L��d����ύ�>EE�i�B�&��j�O����*��+OI�!u�{慶����:�����J�C���b��#�M�sM��R���F�K���e�&�&��r���ŝ���Z�f�XRe(?FA��{��B�R�͡s�/�U)�A�-Ȓ����d�3���|ۿMm�e��u�Q�����v�9~fh�:o����(����׌(��9$�Й��SG^i����X#;���a�x���+)?�#mg��$҉�ģ,�pYR��+O���?�!I*� N/3*�D��sr��1��Lu��Y'���&wn�X	�6�\u�b�G{u�黈��%"L��F�XI���-�I��KTBC���-�nEj\�0=�>���(QQժ>w��1�YR�c���:�5��l_z���N���j9�U<�xƞ?�c/\#o$}9��Xv�u�r1����(�|/�o�%�l9Y�٣c�j�SGR�yB�����)@�vu�����w<�{�kt��w����v:Kw-s�cA�h򠘸��Պm��]�*[����=Z���!oC |:�%�χW�4U��.xJ�"����������;�@0���~�Dՙ��#�T�ʩ�b���3�M�ۤ�,ţ�F����{�%�x�"�~`-�����f�2$S����ckqWX�����i�,#.��?������/
���sاJk�ل=��e���Ӊ���l=ͷ���
�*�uvrx/�n!�|X)��l�3r����z���/l��%?ظ��O���:�M"�5����N��|ј1`����~��v�y��o�M�\�ZHB'�\Ml@�<�f[�d���kZ&��Q�[D��'2��3~��f�R������o�F$JH��ܗBPF��BaC����?%{`��S|i(^�����'�l]�Q�i[d����Af���3V؅��]��?�Pf��-vλ@����g	��S �q�E��k3����>�_~~��CHM<  ��]�:�潗�8S�;�ۢ<��%�.�К����%��	���V��	)���\]MVH�d�1_�������i�ḋ�ma��J�J��<gS/j|�5���7V�a����o������4g3/S����x�ϗ�e4��`/�Mӫ8�-*����{~�+/����Z�Q0��?~�i����t��>��S����	y�|;7Ћ7t=��Nl��mi��T|� }�C�xϓ�m��N�Nr*�MK���|�D�M1�QjL��q"]a��D�o���?��E�u���N(^c�I��D"�k�������^~��2���4�Z���� �j=~�&y��2�(W��.����D�BI�z�"D�y����E!m��6g��+��v��n�3�Uf"b �)�=ReEǋ�O��%�.��6'��Z�"UBw=�~��*U!��`#	Q�oU	)̢^q|b1{-^�N���'�Ϩ>T�s8D���em�T��3W^��3¾�M�E�J �Q�������z�r���2hL�">!���="m�� K��O�ܱ�j5v#��ue��m	G�5J��Z�R���g`�h��Qտ�l�Mtg����&;��Fݡ
Q��l@����}�W�Vv��@�p3���!V@ne�j�v�-+M��Y'�5k"ݽ��S�_[�W��-1�ߊ���1�d؄J���Z\�R��g�>n�f�&�˔�*"�N� Q!�12��#J/};�x�	��M��R"����#"@qcV���t�*�e*χB5+�p�NRTɈ��t�Ȋܖ������J��P�|)Ҥ�ٻ�á\�����"��+��^M;��.�R��@=MVl��}ܦ�\��_]�����@V<��I�Z�i��B:2��I-$Cjj�6OV\K��#��FFugAjf���wv�&3!��؛/"�󗓥'���ϗ*�'�"ͺ��&�x�I%D�Ca���^,&�E0	T4:�a �	  W��?����1��p/��d�7���O�,kCwB��.2�wI�Di��o�ݟ��)��r߈;��]�'�kk\�|iª����?�d֑��<�p���P�eS)�m�fE8����H��o&#�6S���G���>�bܴ�u�zg[�h6DȖV;g���ҍ���
۪�m�dv���+���lE&����[��ݢ�	i��|�Y�w��kA�߿bSڰO`);g�+'��ԣ5��;M���f����Ni�d��Ӛ�������������S=��)+Hm��yc:���l=>E.��=2r6�2�4��X�{�n2��|�pn�ݪ���9�q(�19�mP�Cčkj�~�U��<��������b�-���b��}/�xԭ0��s%&�y�C�Xy�Tқ� ��؟̢Go�O��	ީ����-C4�[�B�	�(�X1�d��m�m?�%z~�DCLg���m�K��nƠW)*RD��S
�1D�5�m+�-|����w�}�\�[}�TH�(����������j�NLbK횕n���ku�o��5Xl���S$5���,���Vlcd[�K�Qw6��9������4G�esL��O(z��^�vr$�`��[4��*ʐ[Cx9�f4:9z��N��*[�ܒ��]Î��_�$�,YC0YU�^2�$�A\Veظ����z��(�XK�-��"E�k8?e@���Ҋ���,����%�%C|�H�$T���[ђc?��s1�c��������f��l�fr<
:��A<_Fc�-�?���e���؛F�h*�˹�5@�"K UX���G덣�y�c���7��w�����N�I=�((F{�\�ff�J����8���ݿE�u*/a�u<�o-���4�ϙ�D} hִ�7�v����'͸w$�U�&Qw�l��V�}��!�R?�����m����1-��9� ���;V��̦(��2�5��6|�@��q$h���"Ӱ�E��B(�z�᧏A�Y!8Zޯm�~�ɢ�N*�q)�����麾_�ہ�P"�"������Xb�"������`���܁���Ra��k��D��5Mr�u��g�>� $"[�c�k�9t�0��4��o#��j�A9����"2�\��GG��e_{6ב6r���-ݘ�?�G8�7{���e+�ݷ��8:X�����6��$��o{������q~i��-,R�+p3� �TA������H�W�����G�D#\��D��
yD4xi^Z���
�7���ez���Ǳ8�Q��e���[_���"g��S����3)<9��X�x6j��V�h^ ����Ȝ�\�c��N��@ZNR�aSS��X�Zg���Z�$�=y
���T��3���-�� ��#X�J�%������6�����*����ow��X�<,�f��8{��n\����-	Ix\�{q�-ym����b�ݷWv\���g;?+�m��l_F�`.����Y~h������v{O��J�����$��Q��h��JY�<�ޡ,�/d*ee�i�E*�[�RԚ��$3�6����h���0���V:ɬlmq&rUz�G1�*���.����.������Ĵ�!kS��G��ѾO�n!�8*A����
�"1�vzV��f�[�y6	�R��:�f��kg���l:D�@Qp������6P���:b���l��$u��<q�p
寝2��������4��E`Wf���knc/�/�`A�҄ ���n�U.��UÊOZʹ+VIz�v���g���~=o�a	�[�2#�Ņ�=���� ,���vk4�0N�[h���-j�Ѕ�xlU)�m�qK	��Q-����c1`����v��ڴ}P�;w�q��g��*�UU�XoW�Q%�YS]X��-M)Sw��2Q��z�A�%��Md�k|�j��`��!� ����$�]LrS�2��d��mm`x�Z����D4J����X�ȣ(�Y�����k�g+����x���s4��U��Cd���1�d>�@I0�̢؛�Q����� ��L�8�.'�e<��P�����7��_L'^�����e<�G�@=:%�;�su��|aŽm�c�D�l5�3[���)&����E����-ۂD����͔��]:�X]UBG"�����Qت3�h����^;��a��];�w_�e�n�mݭ��u��ϭ$�-�����r���iYԕa7�tő�Unrt"�MXL����Ɵ��f/5�*F*Md����<Q���$u��i��+S���;��}�W��v%��n+l��v�bG@3�k��U��N����L��ڛ*ٿ�sW��Ͳۿ-��|��g��q�ߺX٣Z~mf�-p1�>����r�d{y���m/ɣ�3&�c���̕��*�?c>�{�0����7�����(�VE���裏���\?      y   d   x�ɹ!�z�~B�@M��Mh�/��t�u+��kC�
r����{��h�v���W B�퇐�NZ����
E�D�P�4E���r�I�m��۟O��e5�      v      x������ � �      x   �   x�K52KNN61�MNL3�5110�M2O6�M40270MM�Zr:���$��Z�q&ba[��;��&f��%��r�%�����&Wx%�xg��[�W���y��z�xf��:��G�:�d��ET�Xf�r����4�=... f�0�      ~   R  x��W[�e+��g.ta.�GE�?�^�G`R����\//�9G�UJ�mҞ��j<۸����;�K�e�����)w�^�~���edp'���
�MU�W�\��V���u]�V,Ҹ���S?6�Q�Ώ��ze`ɖ��qhsN�n_|���*I���J�/��q���h�f�:5�*��j�A}����E1���5m�<�V�F�a7zjA~l�]��v�<�*�߳׶���q�ҕ��Ub2S�[��%` �Ee�@Ac��z6_��(�����8hQ�NZ+7]�ˏs���t:n�$�����rS��L�o?�h��.I�,t7r�yf}<N��w�5̩0'���٪�8#�[�uByZQX��d��W@�6�-�)�ViD/L�����C��3�U3�wM�3����.��J�6��Ώxj�3��d.�/0pK2~��W��>Pb] 
ݡ�Wͽz3V��de�6Z`��iEܼz3u�U���p���4��h4l��P��zw��QӍ�Z��PFUQ^g�<��kw�s���^���h��������G�4��ALp���X(�L��H�sy�Su�-0l��3M����7` ��~��%4מ�9���7�f�L��8�%�8E��Gwr  �)���t���--��o�5Q�HmL��;��l��Ά}�����5���`n�+z�ǻkKS�1��pNh�DBp�{�;?Vr���To�~��#կy��Gd���G�w@�Lo�}z5\�A�Ǭ�dn���Rυ��@`9w1���X���^$���or�\���xw7�W�I�7P��g^l:ֶ�}�S��w"Wؗ0 oo�q�����y��!}�UYK�C�}��f�Vxo�g:�]CA��_�+�$w ��>�'�c���N	�ğ�n��}㱒�9O~Z���v����蔀�K{�O]�5g�����+�X���悻GL����w�˙�:BX�lp�wJQք��}��B~���㭃\�ˊ��@3�O��"������z�m��B;	�b�H��SF���^�I9g�=��b:�Ⱦ�oK8�N�G��4��X&&�H�l��9�<�+ፂlq:]�7*!��`�.�	���Ƿ�A
�� O}/�&�dj��Ύ��(�W{C���<8BP\:I|Ϭq�n�JS<�|�mU��'���iCݼ����K�	�h&�}���_�3z�[��3>�����g��(�<��ཱུ��R�o���^h�|?�|d0���U�6Ǘ��z5��b����8(LB�`N}A3x��N��D:�||�rR�K�^A�r���R�g��Zm��n~�Ⱦ �Db��	b?v�5�������x`�9A�qzC�������d]p     