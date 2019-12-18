FROM postgres:10.5

RUN apt-get update && apt-get install -y build-essential curl postgresql-server-dev-10
RUN curl https://ftp.postgresql.org/pub/source/v10.5/postgresql-10.5.tar.gz -o /postgresql-10.5.tar.bz2
RUN cd / && tar xvf postgresql-10.5.tar.bz2
RUN cd /postgresql-10.5/contrib/cube && sed -i 's/#define CUBE_MAX_DIM (100)/#define CUBE_MAX_DIM (350)/' cubedata.h && \
    USE_PGXS=true make && USE_PGXS=true make install

EXPOSE 5432