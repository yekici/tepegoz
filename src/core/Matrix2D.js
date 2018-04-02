// name:t.Core.Matrix2D
// require:core.Util

var Matrix2D;


(function () {

    /**
     * 2D Görüntü Matrisi
     * @class Matrix2D
     */
    t.Matrix2D = Matrix2D = t.extend.call(Array , function (matrix) {
        if (t.isArray(matrix)) {
            this.push.apply(this , matrix);
        } else {
            this.push(1 , 0 , 0 , 1 , 0 , 0);
        }
    } , /**@lends Matrix2D.prototype*/{

        /**
         * Değerleri birim matrise çevirir
         */
        reset: function () {
            this[0] = 1;
            this[1] = 0;
            this[2] = 0;
            this[3] = 1;
            this[4] = 0;
            this[5] = 0;
            return this;
        },

        /**
         * Değeleri değiştirir
         * @param {array} matrix
         * @return {Matrix2D}
         */
        set: function (m) {
            this[0] = m[0];
            this[1] = m[1];
            this[2] = m[2];
            this[3] = m[3];
            this[4] = m[4];
            this[5] = m[5];
            return this;
        },

        /**
         * Kopyasını döndürür
         * @returns {Matrix2D}
         */
        clone: function () {
            return new Matrix2D(this);
        },

        /**
         * Mevcut matrisi Matrix2D.temp atar ve onu döndürür
         * @returns {Matrix2D}
         */
        toTemp: function () {
            Matrix2D.temp.set(this);
            return Matrix2D.Temp;
        },

        /**
         * Matris çarpımı
         * unbound true ise çıkan sonuç mevcut matrise atanmaz.sonucun kopyası döndürülür
         * m0 m2 m4     n0 n2 n4     m0*n0 + m2*n1     m0*n2 + m2*n3    m0*n4 + m2*n5 + m4
         * m1 m3 m5  x  n1 n3 n5  =  m1*n0 + m3*n1     m1*n2 + m3*n3    m1*n4 + m3*n5 + m5
         * 0  0  1      0  0  1      0
         * @param {array} matrix Çarpılacak matris
         * @param {bool} toTemp True ise kendi matrisine çarpım sonucu atmak yerine Matrix2D.temp e atar ve onu döndürür
         * @return {Transform}
         */
        multiply: function (n) {

            var t = this,
                t0 = t[0],
                t1 = t[1],
                t2 = t[2],
                t3 = t[3];

            t[0] = t0 * n[0] + t2 * n[1];
            t[1] = t1 * n[0] + t3 * n[1];

            t[2] = t0 * n[2] + t2 * n[3];
            t[3] = t1 * n[2] + t3 * n[3];

            t[4] = t0 * n[4] + t2 * n[5] + t[4];
            t[5] = t1 * n[4] + t3 * n[5] + t[5];

            return this;
        },


        /**
         * Ölçeklendirme
         * matris çarpımı yapıyoruz.[x , 0 , 0 , y , 0 , 0] matrisi ile mevcut matrisi çarpıyoruz
         * hız için etkilenecek sonuçları üstteki matrix çarpımı sonucundan tespit edip
         * tek tek çarpılır.
         * @param {number} x X eksenindeki ölçeklendirme değeri
         * @param {number} y Y eksenindeki ölçeklendirme değeri
         * @return {Matrix2D}
         * @example
         * ts.scale(2 , 2); // x ve  y ekseninde 2 kat büyüdü
         * ts.scale(1 , 2); // y eksenin 2 kat büyüdü
         */
        scale: function (x , y) {
            this[0] *= x;
            this[1] *= x;
            this[2] *= y;
            this[3] *= y;
            return this;
        },

        /**
         * Konumlandırma
         * @param {number} x X eksenindeki konumlandırma değeri
         * @param {number} y Y eksenindeki konumlandırma değeri
         */
        translate: function (x , y) {
            this[4] += this[0] * x + this[2] * y;
            this[5] += this[1] * x + this[3] * y;
            return this;
        },

        /**
         * Eğme
         * @param {number} x=0 X eksenindeki eğme değeri
         * @param {number} y=0 Y eksenindeki eğme değeri
         */
        skew: function (x , y) {
            var t = this,
                t0 = t[0],
                t1 = t[1],
                t2 = t[2],
                t3 = t[3];

            t[0] = t0 + t2 * x;
            t[1] = t1 + t3 * x;

            t[2] = t0 * y + t2;
            t[3] = t1 * y + t3;

            return this;
        },


        /**
         * Döndürme
         * @param {number} radian Döndürme değeri (radyan cinsinden)
         */
        rotate: function (radian) {
            var c = Math.cos(radian),
                s = Math.sin(radian),
                t = this,
                t0 = t[0] ,
                t1 = t[1] ,
                t2 = t[2] ,
                t3 = t[3];


            t[0] = t0 * c + t2 * s;
            t[1] = t1 * c + t3 * s;

            t[2] = t0 * -s + t2 * c;
            t[3] = t1 * -s + t3 * c;

            return this;
        },


        /**
         * Determinatı hesaplar
         * @return  {number}
         */
        determinant: function () {
            return this[0] * this[3] - this[1] * this[2];
        },

        /**
         * Matrisin tersini alır
         * @param {bool} toTemp True ise sonucu mevcut matris yerine Matrix2D.temp e atar ve onu döndürür
         * @return {Transform}
         */
        invert: function () {
            var dt = this.determinant(),
                s = this,
                s0 = s[0],
                s1 = s[1],
                s2 = s[2],
                s3 = s[3],
                s4 = s[4],
                s5 = s[5];

            if (Math.abs(dt) > t.EPSILON) {
                dt = 1 / dt;

                s[0] = s3 * dt;
                s[1] = -s1 * dt;
                s[2] = -s2 * dt;
                s[3] = s0 * dt;
                s[4] = (s2 * s5 - s3 * s4) * dt;
                s[5] = -(s0 * s5 - s1 * s4) * dt;

            }else {
                t.warn(this , 'Determinant mustnt equals zero');
            }
            return this;
        },


        /**
         * Belirtilen noktanın mevcut matriste göre hangi noktaya denk geldiğini döndürür
         * @param {number} x=0 X değeri
         * @param {number} y=0 Y değeri
         * return {Vector}
         * @example
         * ts.translate(30 , 30);
         * ts.point(0 , 0); // döndürür {x:30 , y:30}
         */
        point: function (x , y) {
            return new V(this[0] * x + this[2] * y + this[4] , this[1] * x + this[3] * y + this[5]);
        },

    });


    Matrix2D.temp = new Matrix2D;



})();