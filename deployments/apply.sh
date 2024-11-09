kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f redis-deployment.yaml
kubectl apply -f redis-service.yaml

kubectl apply -f prometheus-configmap.yaml
kubectl apply -f prometheus-deployment.yaml
kubectl apply -f prometheus-service.yaml
kubectl apply -f prometheus-clusterrole.yaml
kubectl apply -f prometheus-serviceaccount.yaml
kubectl apply -f prometheus-clusterrolebinding.yaml
kubectl apply -f node-exporter-daemonset.yaml

kubectl apply -f grafana-configmap.yaml
kubectl apply -f grafana-deployment.yaml
kubectl apply -f grafana-service.yaml

kubectl apply -f frontend-ingress.yaml
kubectl apply -f backend-ingress.yaml
kubectl apply -f grafana-ingress.yaml

kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.7/manifests/metallb.yaml
kubectl apply -f lb-pool.yaml
kubectl apply -f lb-ads.yaml
kubectl apply -f lb-controller.yaml
