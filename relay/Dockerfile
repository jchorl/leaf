FROM python:2.7

RUN apt-get update && \
    curl -o cloudsdk.tar.gz https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-161.0.0-linux-x86_64.tar.gz && \
    tar -xvf cloudsdk.tar.gz && \
    ./google-cloud-sdk/install.sh --usage-reporting false -q --additional-components beta && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y nodejs

ENV PATH="/google-cloud-sdk/bin:${PATH}"
