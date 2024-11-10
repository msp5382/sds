kubectl --kubeconfig kube.yaml apply -f frontend-deployment.yaml
kubectl --kubeconfig kube.yaml apply -f frontend-service.yaml
kubectl --kubeconfig kube.yaml apply -f backend-deployment.yaml
kubectl --kubeconfig kube.yaml apply -f backend-service.yaml
kubectl --kubeconfig kube.yaml apply -f redis-deployment.yaml
kubectl --kubeconfig kube.yaml apply -f redis-service.yaml

kubectl --kubeconfig kube.yaml apply -f prometheus-configmap.yaml
kubectl --kubeconfig kube.yaml apply -f prometheus-deployment.yaml
kubectl --kubeconfig kube.yaml apply -f prometheus-service.yaml
kubectl --kubeconfig kube.yaml apply -f prometheus-clusterrole.yaml
kubectl --kubeconfig kube.yaml apply -f prometheus-serviceaccount.yaml
kubectl --kubeconfig kube.yaml apply -f prometheus-clusterrolebinding.yaml
kubectl --kubeconfig kube.yaml apply -f node-exporter-daemonset.yaml

kubectl --kubeconfig kube.yaml apply -f grafana-configmap.yaml
kubectl --kubeconfig kube.yaml apply -f grafana-deployment.yaml
kubectl --kubeconfig kube.yaml apply -f grafana-service.yaml

kubectl --kubeconfig kube.yaml apply -f frontend-ingress.yaml
kubectl --kubeconfig kube.yaml apply -f backend-ingress.yaml
kubectl --kubeconfig kube.yaml apply -f grafana-ingress.yaml

