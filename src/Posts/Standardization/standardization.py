import numpy as np
import soundfile as sf
import codecs
import json
import timeit


def standardize(x, M):
    N = x.size
    out = np.zeros(N - M)
    for i in range(0, N - M):
        out[i] = x[i] - np.mean(x[i:i + M])
        out[i] = out[i] / np.std(x[i:i + M])
    return out


def moving_average(x, M):
    x_sum = np.cumsum(x)
    return (x_sum[M:] - x_sum[:-M]) / float(M)


def standard_deviation(x, M):
    x_sum = np.cumsum(x)
    x_sq_sum = np.cumsum(np.square(x))

    mean = (x_sum[M:] - x_sum[:-M]) / float(M)
    sq_mean = (x_sq_sum[M:] - x_sq_sum[:-M]) / float(M)
    return np.sqrt(sq_mean - np.square(mean))


def standardize_vec(x, M):
    x_sum = np.cumsum(x)
    x_sq_sum = np.cumsum(np.square(x))

    mean = (x_sum[M:] - x_sum[:-M]) / float(M)
    sq_mean = (x_sq_sum[M:] - x_sq_sum[:-M]) / float(M)
    std = np.sqrt(sq_mean - np.square(mean))
    return (x[:-M] - mean) / std


def generate_test_data(path, output, standardize):
    data, _ = sf.read(path)
    data = data[0:data.size:20]
    if(standardize):
        data = standardize_vec(data, 100)
    json.dump(data.tolist(), codecs.open(output, 'w', encoding='utf-8'),
              separators=(',', ':'), sort_keys=True, indent=4)


class Data(object):
    M = 2048
    x = 200*np.random.randn(10000) + 20

    def __init__(self):
        pass


if __name__ == "__main__":
    generate_test_data('C:/Users/Jason/Desktop/LDC93S1.wav', './data.standardize.json', True)
    out = standardize_vec(Data.x, Data.M)
    print(timeit.timeit("standardize(Data.x, Data.M)",
                        setup="from __main__ import standardize, Data", number=50))
    print(timeit.timeit("standardize_vec(Data.x, Data.M)",
                        setup="from __main__ import standardize_vec, Data", number=50))
