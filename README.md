# Integration / unit tests example

En este proyecto generamos una suite de tests de integración, sumado a un test unitario.
Para poder ejecutar, debe instalar las librerías necesarias:

```
npm install
```

Finalmente ejecutar el script de tests:

```
npm run test
```

Si se fijan, el script de test definido en el archivo `package.json` tiene el siguiente comando:

```
jest --runInBand
```

La opción `--runInBand` permite correr los tests uno después del otro, y eso evita el problema al levantar
el servidor en un determinado puerto, puesto que cada test lo intenta hacer, y si encuentra que el
puerto ya se está usando, los tests se van a caer.
